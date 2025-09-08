"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use('/api/auth', auth_routes_1.default);
// Ruta de prueba
app.get('/', (_req, res) => {
    res.json({
        message: 'API Kando PIAR funcionando correctamente'
    });
});
// Ruta de prueba para la base de datos
app.get('/db-test', async (_req, res) => {
    try {
        const result = await database_1.default.query('SELECT NOW()');
        res.json({
            message: 'Conexión exitosa a la base de datos',
            timestamp: result.rows[0].now
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error conectando a la base de datos',
            error: error.message
        });
    }
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
exports.default = app;
