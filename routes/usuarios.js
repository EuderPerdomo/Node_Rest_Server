//import express from 'express'
const {Router} =require('express')
const {check}=require('express-validator')


const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete}=require('../controllers/usuarios')

const {validarCampos,validarJWT,tieneRol, esAdminRol}=require('../middlewares')



const { esRolValido, emailExiste,existeUsuarioPorId} = require('../helpers/dbvalidators')


const router=Router()


router.get('/',usuariosGet)

router.put('/:id',[
      check('id','No es un ID valido').isMongoId(),
      check('id').custom(existeUsuarioPorId),
      validarCampos
  ],usuariosPut)


  router.post('/',[
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('password','La contraseña es Obligatoria y superior a 6 caracteres').isLength({min:6}),
    check('correo').custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE'
    check('rol').custom(esRolValido),
    validarCampos
  ],usuariosPost)


  router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
      check('id').custom(existeUsuarioPorId),
      validarCampos
  ],
  usuariosDelete)



module.exports=router