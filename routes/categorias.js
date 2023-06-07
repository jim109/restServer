const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaId } = require('../helpers/db-validators')

const router = Router();

// {{url}}/api/categorias

//Obtener todas las categorias - public
router.get('/', obtenerCategorias)

//Obtener una categoria x id - public
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaId ) //sinoexist categoria deberia dar error
], obtenerCategoria)

//Crear categoria - Privado cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    validarCampos,
    ], crearCategoria)

//Actualizar un registro por el id - privado - cualquier token valido
router.put('/:id', [
    validarJWT, //lo usamos porque necesitamos validar que el token este activo 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos,
],actualizarCategoria )

//borrar una categoria - Solo Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos,
] ,borrarCategoria)

module.exports = router;