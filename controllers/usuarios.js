const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {

    //paginacion
    const { limite = 5, desde = 0 } = req.query;

    const query = {estado: true}

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(Number(limite))
    ])

    res.json({
        usuarios,
        total
    })
}

const usuariosPost = async(req, res) => {

    //recibimos la informacion que viene del body enviada por el cliente
    // const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptamos la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    //grabamos el usuario en la base de datos
    await usuario.save();

    res.json({
        msg: 'Post API - Controlador',
        usuario
    })
}

const usuariosPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ) {
        //Encriptamos la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    //Actualizamos el registro del password, pasamos el id que recibimos y los datos de la variable resto
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario)
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - Controlador'
    })
}

const usuariosDelete = async(req, res) => {
    
    const { id } = req.params;

    //Borrarlos Fisicamente - NO RECOMENDABLE
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false })

    res.json({
        msg: 'Delete API - Controlador',
        usuario
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}