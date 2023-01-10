const {Router} =require('express')
const {check}=require('express-validator')

const { crearCategoria, 
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, 
    borrarCategoria} = require('../controllers/categorias')

const { existeCategoriaPorId } = require('../helpers/dbvalidators')
const { validarJWT, esAdminRol } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar_campos')

const router=Router()

//Obtener todas las categorias -Publico
router.get('/',obtenerCategorias)


//Obtener una categoria por id -Publico
router.get('/:id',[
    check('id','No es un id de mongo valida').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId)

],obtenerCategoria)


//Crear una categoria --Privado Cualquiera con un token valido
router.post('/',[validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos
],crearCategoria)

//Actualizar --Privado Cualquiera con un token valido
router.put('/:id',[
validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
check('id').custom(existeCategoriaPorId),
validarCampos
],actualizarCategoria)

//Borrar categorias --Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','No es un Id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

],borrarCategoria)

module.exports=router