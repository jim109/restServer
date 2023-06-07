const { response } = require("express")
const { Producto } = require('../models')

const obtenerProductos = async(req, res = response ) => {

    const { limite= 5, desde = 0 } = req.query
    const query = { estado : true }

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(desde)
                .limit(Number(limite))
    ])

    res.json({
        productos,
        total
    })

}

const obtenerProducto = async(req, res = response ) => {
    const { id } = req.params
    const idProducto = await Producto.findById(id)
                                     .populate('usuario', 'nombre')
                                     .populate('categoria', 'nombre')

    res.json({
        idProducto
    })
    
}


const crearProducto = async(req, res = response ) => {

    //saco del body lo que no quiero recibir,en este caso el estado y el usuario no deben venir con informacion que no sea del token
    const { estado, usuario, ...body } = req.body

    const productoExtiste = await Producto.findOne({ nombre: body.nombre })

    if( productoExtiste ) {
        return res.status(400).json({
            msg: `El producto ${ productoExtiste.nombre } ya existe en la BD`
        })
    }

    const data = {  ...body,
                    nombre: body.nombre.toUpperCase(),
                    usuario: req.usuario._id,
                      
                }

    const producto =new Producto(data)
    //Guardamos en la Base de Datos
    await producto.save()

    res.status(201).json(producto) 
}


const actualizarProducto = async(req, res = response ) => {
    const { id } = req.params
    const { estado, usuario, ...data} = req.body

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id

    const productoActualizar = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json( productoActualizar )
    
}


const borrarProducto = async(req, res = response ) => {
    const { id } = req.params
    const productoBorrar = await Producto.findByIdAndUpdate( id, {estado: false }, {new:true})

    res.json(productoBorrar)
    
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}