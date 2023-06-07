const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

class Server {

    //Declaramos las propiedades dentro del constructor
    constructor() {
        //creamos la aplicacion de express como una propiedad en la clase
        this.app = express();
        //
        this.port = process.env.PORT
        //Api de usuarios
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
        }


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
        this.app.use( express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use(fileUpload  ({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));

    }

    //Routes mediante un metodo, definimos las rutas que queremos
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    //metodo listen
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port)
        })
    }
}

module.exports = Server;