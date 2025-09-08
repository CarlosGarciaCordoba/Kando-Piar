import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import pool from '../../config/database';

export const login = async (req: Request, res: Response) => {
    try {
        const { userCode, password, institution } = req.body;

        // Validar que se proporcionaron todos los campos requeridos
        if (!userCode || !password || !institution) {
            return res.status(400).json({
                success: false,
                message: 'Código de usuario, contraseña y código de institución son requeridos'
            });
        }

        // Buscar usuario por código de usuario y código de institución
        const userResult = await pool.query(
            `SELECT cedula, codigo_usuario, nombres, apellidos, email, telefono, 
                    password_hash, codigo_institucion, debe_cambiar_password, 
                    estado, intentos_fallidos, bloqueado_hasta 
             FROM usuarios 
             WHERE codigo_usuario = $1 AND codigo_institucion = $2 AND estado = true`,
            [userCode, institution]
        );

        const user = userResult.rows[0];

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Código de usuario, contraseña o código de institución incorrectos'
            });
        }

        // Verificar si el usuario está bloqueado
        if (user.bloqueado_hasta && new Date() < new Date(user.bloqueado_hasta)) {
            return res.status(423).json({
                success: false,
                message: 'Usuario bloqueado temporalmente. Intente más tarde'
            });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            // Incrementar intentos fallidos
            const intentos = user.intentos_fallidos + 1;
            const bloqueado_hasta = intentos >= 3 ? 
                new Date(Date.now() + 15 * 60 * 1000) : // 15 minutos de bloqueo
                null;

            await pool.query(
                'UPDATE usuarios SET intentos_fallidos = $1, bloqueado_hasta = $2 WHERE cedula = $3',
                [intentos, bloqueado_hasta, user.cedula]
            );

            return res.status(401).json({
                success: false,
                message: 'Código de usuario, contraseña o código de institución incorrectos'
            });
        }

        // Login exitoso - resetear intentos fallidos y actualizar último acceso
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
                apellidos: user.apellidos,
                codigo_institucion: user.codigo_institucion
            },
            process.env.JWT_SECRET || 'tu_clave_secreta_kando',
            { expiresIn: '8h' }
        );

        // Enviar respuesta exitosa
        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                cedula: user.cedula,
                codigo_usuario: user.codigo_usuario,
                nombres: user.nombres,
                apellidos: user.apellidos,
                email: user.email,
                telefono: user.telefono,
                codigo_institucion: user.codigo_institucion,
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