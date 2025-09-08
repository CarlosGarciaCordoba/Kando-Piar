"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
// Ruta de autenticación
router.post('/login', auth_validator_1.loginValidator, auth_controller_1.login);
// Exportar el router
exports.default = router;
