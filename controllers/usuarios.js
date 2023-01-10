
const {response, request} =require('express')
const Usuario=require('../models/usuario')
const bcryptjs=require('bcryptjs')


usuariosGet=async (req=request, res=response)=> {
    const {limite=2,desde=0}=req.query
    const query={estado:true}

const [total,usuarios]=await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .limit(Number(limite))
    .skip(Number(desde))
])

    res.json({total,usuarios})
}

const usuariosPost=async (req, res=response)=> {
    


    const {nombre, correo, password,rol}=req.body
    const usuario=new Usuario({nombre,correo,password,rol})

    //Verificar si existe el correo
    

    //Encriptar contraseña 
    const salt=bcryptjs.genSaltSync()
    usuario.password=bcryptjs.hashSync(password,salt)

    //Guardar en DB
    await usuario.save()
    res.json({
        usuario
    })
}

usuariosPut=async(req, res=response)=> {
    
    const {id}=req.params
    const {_id,password,google,correo,...resto}=req.body

    //Todo validar contra db

    if(password){
    const salt=bcryptjs.genSaltSync()
    resto.password=bcryptjs.hashSync(password,salt)
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto)

    res.json(usuario)
}


const usuariosDelete=async(req, res=response)=> {
    const {id}=req.params


    const uid=req.uid
    //Borrado fisico
//const usuario=await Usuario.findByIdAndDelete(id)

//Cambiar solo el estado apra mantener integridad referencial
const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
//const usuarioAutenticado=req.usuario

    res.json({
       usuario
    })
}


module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}