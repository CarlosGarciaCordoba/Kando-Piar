"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
/**
 * Middleware global de manejo de errores.
 * Cualquier error pasado a next(err) o lanzado en rutas async cae aquí.
 */
function errorHandler(err, _req, res, _next) {
    console.error('💥 Error no controlado:', err);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
}
