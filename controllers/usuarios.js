const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'Get API - Controlador',
        query
    })
}

const usuariosPost = (req, res) => {

    //recibimos la informacion que viene del body enviada por el cliente
    // const body = req.body;
    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post API - Controlador',
        nombre, edad
    })
}

const usuariosPut = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: 'Put API - Controlador',
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - Controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete API - Controlador'
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}