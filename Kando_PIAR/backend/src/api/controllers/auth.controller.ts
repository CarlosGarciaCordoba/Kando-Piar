import { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../config/database';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validar que se proporcionaron email y password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Buscar usuario por email
        const userResult = await pool.query(
            'SELECT cedula, codigo_usuario, nombres, apellidos, password_hash, estado, debe_cambiar_password, intentos_fallidos, bloqueado_hasta FROM usuarios WHERE email = $1',
            [email]
        );

        const user = userResult.rows[0];

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Verificar si el usuario está bloqueado
        if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > new Date()) {
            return res.status(403).json({
                success: false,
                message: 'Usuario bloqueado temporalmente',
                bloqueadoHasta: user.bloqueado_hasta
            });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            // Incrementar intentos fallidos
            const nuevoIntentos = user.intentos_fallidos + 1;
            let bloqueadoHasta = null;

            if (nuevoIntentos >= 3) {
                bloqueadoHasta = new Date(Date.now() + 15 * 60000); // 15 minutos
            }

            await pool.query(
                'UPDATE usuarios SET intentos_fallidos = $1, bloqueado_hasta = $2 WHERE cedula = $3',
                [nuevoIntentos, bloqueadoHasta, user.cedula]
            );

            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
                intentosRestantes: Math.max(0, 3 - nuevoIntentos)
            });
        }

        // Resetear intentos fallidos si el login es exitoso
        await pool.query(
            'UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL, ultimo_acceso = CURRENT_TIMESTAMP WHERE cedula = $1',
            [user.cedula]
        );

        // Generar token JWT
        const token = jwt.sign(
            {
                cedula: user.cedula,
                codigo_usuario: user.codigo_usuario,
                nombres: user.nombres,
                apellidos: user.apellidos
            },
            process.env.JWT_SECRET || 'tu_clave_secreta',
            { expiresIn: '8h' }
        );

        // Enviar respuesta exitosa
        res.json({
            success: true,
            message: 'Login exitoso',
            token,
            user: {
                cedula: user.cedula,
                codigo_usuario: user.codigo_usuario,
                nombres: user.nombres,
                apellidos: user.apellidos,
                debe_cambiar_password: user.debe_cambiar_password
            }
        });

    } catch (error: any) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};