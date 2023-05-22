
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-rol');
const validaCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validaRoles,
    ...validaJWT,
    ...validaCampos
}