const {Router} =require('express')
const {check}=require('express-validator')

const { crearProducto, 
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto} = require('../controllers/productos')
const { existeCategoriaPorId,existeProductoPorId } = require('../helpers/dbvalidators')

//const { existeCategoriaPorId } = require('../helpers/dbvalidators')
const { validarJWT, esAdminRol } = require('../middlewares')
const { validarCampos } = require('../middlewares/validar_campos')

const router=Router()



//Crear un Producto--Privado Cualquiera con un token valido
router.post('/',[validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es in Id de mongo Valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
    ],crearProducto)

//Obtener todas los productos -Publico
router.get('/',obtenerProductos)


//Obtener un producto por id -Publico
router.get('/:id',[
    check('id','No es un id de mongo valida').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],obtenerProducto)

//Actualizar --Privado Cualquiera con un token valido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un Id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    ],actualizarProducto)
    
//Borrar Producto --Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','No es un Id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)

module.exports=router