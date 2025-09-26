"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.recoverPasswordValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validador para la ruta de login
 * Verifica que el código de usuario, contraseña y código de institución cumplan con los requisitos
 */
exports.loginValidator = [
    (0, express_validator_1.body)('userCode')
        .notEmpty()
        .withMessage('El código de usuario es requerido')
        .trim()
        .isLength({ min: 2, max: 3 })
        .withMessage('El código de usuario debe tener entre 2 y 3 caracteres')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('El código de usuario solo puede contener letras mayúsculas y números'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),
    (0, express_validator_1.body)('institution')
        .notEmpty()
        .withMessage('El código de institución es requerido')
        .trim()
        .isLength({ min: 3, max: 15 })
        .withMessage('El código de institución debe tener entre 3 y 15 caracteres')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('El código de institución solo puede contener letras mayúsculas y números')
];
exports.recoverPasswordValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('El correo es requerido')
        .isEmail().withMessage('Correo inválido')
];
exports.resetPasswordValidator = [
    (0, express_validator_1.body)('token')
        .notEmpty().withMessage('Token requerido')
        .isLength({ min: 32 }).withMessage('Token inválido'),
    (0, express_validator_1.body)('newPassword')
        .notEmpty().withMessage('Nueva contraseña requerida')
        .isLength({ min: 8 }).withMessage('Debe tener mínimo 8 caracteres')
];
