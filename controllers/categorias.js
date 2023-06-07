const { response } = require("express");
const mongoose = require('mongoose');
const { Categoria } = require("../models")

//Obtener Categorias - paginado - total - populate
const obtenerCategorias = async( req, res ) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
            .skip(desde)
            .limit(Number(limite))
    ])

    res.json({
        categorias,
        total
    })

}

//Obtener Categoria - populate { objeto categoria }
const obtenerCategoria = async( req, res ) => {

    const { id } = req.params
    const idCategoria = await Categoria.findById(id).populate('usuario', 'nombre')

    res.json({
        idCategoria
    })

}

//Crear Categoria 
const crearCategoria = async( req, res = response ) => {

    //sacamos el nombre que viene del body del request
    const nombre = req.body.nombre.toUpperCase();
    //Reviso si tengo una categoria grabada con el mismo nombre
    const categoriaDB = await Categoria.findOne({ nombre });
    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
    //generamos la data que queremos guardar
    const data = {
        //Nombre categoria
        nombre,
        //usuario que esta guardando la categoria nueva
        usuario: req.usuario._id
    }
    //
    const categoria = new Categoria(data)

    //Guarda en Base de Datos
    await categoria.save()

    //mandamos la respuesta, normalmente cuando se crea se envia un 201
    res.status(201).json(categoria)
    
}

//Actualizar categoria, se debe cambiar el nombre y verificar que el otro no exista
const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params
    const { estado, usuario , ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    //Grabamos el id del usuario que esta actualizando
    data.usuario = req.usuario._id

    const categoriaActualizar = await Categoria.findByIdAndUpdate( id, data, { new: true } )

    res.json( categoriaActualizar )

}
//Borrar categoria = Estado en False - verificar id para poder eliminar
const borrarCategoria = async( req, res = response) => {
    const { id } = req.params
    const categoriaBorrar = await Categoria.findByIdAndUpdate( id, {estado: false}, { new: true })

    res.json(categoriaBorrar)

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}