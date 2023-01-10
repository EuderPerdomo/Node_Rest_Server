const { request } = require('express')
const jwt=require('jsonwebtoken')

const Usuario = require('../models/usuario')


const validarJWT = async(req=request,res=response,next)=>{
const token=req.header('x-token')

if(!token){
    return res.status(401).json({
        msg:'No hay token en la petición'
    })
}

try {
const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)

const usuario = await Usuario.findById(uid)

//Verificar que exista el usuario
if(!usuario){
    return res.status(401).json({
        msg:'No se encuentra el USuario en la DB'
    })
}

//Verificar si el uid tienne un estado true o habilitado
if(!usuario.estado){
    return res.status(401).json({
        msg:'Usuario Deshabilitado'
    })
}

req.usuario=usuario

    next() 
} catch (error) {
    console.log(error)
    res.status(401).json({
        msg:'Token invalido'
    })
}


}

module.exports={
    validarJWT
}