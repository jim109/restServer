
const { Schema, model } = require('mongoose');
const { boolean } = require('webidl-conversions');

const CategoriaSchema = Schema({
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
    }
});

//Sobreescibir el metodo toJSON
CategoriaSchema.methods.toJSON = function() {
    //usamos la desestructuracion y del objeto sacamos el password y el __v,
    //y creamos un objeto llamado usuario sin estos elementos para mostrar la repuesta
    const { __v, estado, ...data } = this.toObject();

    return data;
}

module.exports = model( 'Categoria', CategoriaSchema)