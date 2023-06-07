
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-rol');
const validaCampos = require('../middlewares/validar-campos');
const validarArchivoSubir = require('../middlewares/validarArchivo');

module.exports = {
    ...validaRoles,
    ...validaJWT,
    ...validaCampos,
    ...validarArchivoSubir
}