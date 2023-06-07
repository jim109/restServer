
const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

//Methods

//Sobreescibir el metodo toJSON
UsuarioSchema.methods.toJSON = function() {
    //usamos la desestructuracion y del objeto sacamos el password y el __v,
    //y creamos un objeto llamado usuario sin estos elementos para mostrar la repuesta
    const { __v, password, _id, ...usuario } = this.toObject();
    //renombramos las variabel _id por uid
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema)