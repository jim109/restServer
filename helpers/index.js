
const dbValidator = require('./db-validators');
const generarToken = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidator,
    ...generarToken,
    ...googleVerify,
    ...subirArchivo,
}