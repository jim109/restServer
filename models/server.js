const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    //Declaramos las propiedades dentro del constructor
    constructor() {
        //creamos la aplicacion de express como una propiedad en la clase
        this.app = express();
        //
        this.port = process.env.PORT
        //Api de usuarios
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares - son funciones que van a anadir otra funcionalidad l webserver
        this.middlewares();

        //Aca llamamos las rutas o routes(), con eso disparamos el metodo routes()
        this.routes();
    }

    //Metodos
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors());

        //Lectura y parseo del body
        this.app.use( express.json());
        
        //Directorio de la carpeta public
        this.app.use( express.static('public'))

    }

    //Routes mediante un metodo, definimos las rutas que queremos
    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    //metodo listen
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port)
        })
    }
}

module.exports = Server;