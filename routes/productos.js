const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto  } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoId, existeCategoriaId } = require('../helpers/db-validators')

const router = Router();

// {{url}}/api/categorias

//Obtener todas las categorias - public
router.get('/', obtenerProductos)

//Obtener una producto x id - public
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoId ) //sinoexist categoria deberia dar error
], obtenerProducto)

//Crear prodcuto - Privado cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos,
    ], crearProducto)

//Actualizar un registro por el id - privado - cualquier token valido
router.put('/:id', [
    validarJWT, //lo usamos porque necesitamos validar que el token este activo 
    // check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos,
],actualizarProducto )

//borrar una categoria - Solo Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos,
] ,borrarProducto)

module.exports = router;