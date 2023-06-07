
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        defaul: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String},
    disponible: { type: Boolean, default: true },
    img: { type: String }
});

//Sobreescibir el metodo toJSON
ProductoSchema.methods.toJSON = function() {
    //usamos la desestructuracion y del objeto sacamos el password y el __v,
    //y creamos un objeto llamado usuario sin estos elementos para mostrar la repuesta
    const { __v, estado, ...data } = this.toObject();

    return data;
}

module.exports = model( 'Producto', ProductoSchema)