"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.sendGmail = sendGmail;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const CREDENTIALS_PATH = path_1.default.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path_1.default.join(__dirname, '../../token.json');
// Cargar credenciales
function loadCredentials() {
    const content = fs_1.default.readFileSync(CREDENTIALS_PATH, 'utf8');
    return JSON.parse(content);
}
// Autenticación OAuth2
async function authorize() {
    const credentials = loadCredentials();
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Verificar si ya existe el token
    if (fs_1.default.existsSync(TOKEN_PATH)) {
        const token = fs_1.default.readFileSync(TOKEN_PATH, 'utf8');
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    }
    else {
        // Generar URL para obtener el token manualmente
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Autoriza esta app visitando esta URL:', authUrl);
        // El usuario debe pegar el código aquí
        throw new Error('No se encontró token. Autoriza la app y guarda el token en token.json.');
    }
}
// Enviar correo
/**
 * Envía correo usando Gmail API.
 * Soporta asunto con caracteres UTF-8 (se codifica en Base64 MIME) y cuerpo HTML.
 */
async function sendGmail(to, subject, html) {
    try {
        console.log('Intentando enviar correo a:', to);
        const auth = await authorize();
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
        // Codificar asunto con UTF-8 Base64 (RFC 2047)
        const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
        const email = [
            `To: ${to}`,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            `Subject: ${encodedSubject}`,
            '',
            html,
        ].join('\r\n');
        const encodedMessage = Buffer.from(email)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });
        console.log('Correo enviado. Respuesta:', result.data);
    }
    catch (error) {
        console.error('Error enviando correo:', error);
        throw error;
    }
}
// Para obtener el token por primera vez, ejecuta manualmente la función authorize() y sigue las instrucciones en consola.
