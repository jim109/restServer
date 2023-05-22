const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -  correo'
            })
        }
        //Verificar si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -  estado: false'
            })
        }
        //verificamos la contraseña
        //compareSync es un funcion que recobe el password y lo compara con el usuario.password de la base de dato, nos devuelve un true o false
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -  password'
            })
        }
        //generamos el JSON Web Token
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: ' Comuniquese con el Administrador'
        })
        
    }


}

module.exports = {
    login,
    
}