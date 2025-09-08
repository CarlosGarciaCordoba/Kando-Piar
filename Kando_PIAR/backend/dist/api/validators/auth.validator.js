"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validador para la ruta de login
 * Verifica que el email y la contraseña cumplan con los requisitos mínimos
 */
exports.loginValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .trim()
        .isEmail()
        .withMessage('Debe proporcionar un email válido')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
];
