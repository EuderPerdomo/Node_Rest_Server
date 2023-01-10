const {response, json}=require('express')
const User =require('../models/usuario')
const bcryptjs=require('bcryptjs')
const { generarJWT } = require('../helpers/generar_jwt')
const { googleVerify } = require('../helpers/google_verify')
const usuario = require('../models/usuario')
const login=async (req,res=response)=>{ 

const {correo,password}=req.body

try {

    //Verificar si email existe
   const usuario = await User.findOne({correo})
    if(!usuario){
        return res.status(400).json({msg:'Usuario o password Incorrectos'})
    }

    //Verificar si usario activo
    if(!usuario.estado){
        return res.status(400).json({msg:'Usuario o password Incorrectos, estado False'})
    }
    //verificar  contraseña
const validPassword=bcryptjs.compareSync(password,usuario.password)

if(!validPassword){
    return res.status(400).json({msg:'Usuario o password Incorrectos, contraseña'})
}
    //token JWT
const token = await generarJWT(usuario.id)

    res.json({
        msg:'login ok',
usuario,token
    })

} catch (error) {
    console.log('El error',error)
    res.status(500).json({
        msg:'Favor comuniquese con el admin del sistema'
    })
}

}

const googleSignIn=async(req,res=response)=>{
const {id_token}=req.body


try {

    const {correo,nombre,img}=await googleVerify(id_token)

let usuario= await User.findOne({correo})

if(!usuario){
    //crearlo
    const data={
nombre,
correo,
password:'nada',
img,
google:true
    }
    usuario=new User(data)
    await usuario.save()
}

//Si el usuario tiene estado false
if(!usuario.estado){
    return res.status(401).json({
        msg:'Usuario Bloqueado, comunicarse con el administrador'
    })
}

//Generar el JWT
const token=await generarJWT(usuario.id)

    res.json({
       usuario,
       token
    })  
} catch (error) {
    json.status(400).json({
        ok:false,
        msg:'No fue posible verificar el token'
    })
}




}

module.exports={
    login,
    googleSignIn
}