"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const validateRequest_1 = require("../../middleware/validateRequest");
const router = (0, express_1.Router)();
// Ruta de autenticación
router.post('/login', auth_validator_1.loginValidator, validateRequest_1.validateRequest, auth_controller_1.login);
// Endpoint para recuperación de contraseña
router.post('/recover-password', auth_validator_1.recoverPasswordValidator, validateRequest_1.validateRequest, auth_controller_1.recoverPassword);
router.post('/reset-password', auth_validator_1.resetPasswordValidator, validateRequest_1.validateRequest, auth_controller_1.resetPassword);
// Endpoint de diagnóstico rápido
router.get('/recover-password-signature', (_req, res) => {
    res.json({
        expectedSubjectPattern: 'RECUP TEST <timestamp> - Kando PIAR',
        note: 'Si no ves este patrón en el correo, la petición va a otra instancia o un proceso previo',
        now: Date.now()
    });
});
// Exportar el router
exports.default = router;
