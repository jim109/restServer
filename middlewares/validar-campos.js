const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    //creamos una constante con la cual traemos los errores que tenemos ya en el express-validator
    const errors = validationResult(req);
    //verificamos que errors este vacio sin errores, caso contratio mandamos respuesta con status 400 con los errores contenidos
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors); 
    }

    next();

}

module.exports = {
    validarCampos
}

