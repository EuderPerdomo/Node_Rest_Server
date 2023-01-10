const esAdminRol=(req,res=response,next)=>{

if(!req.usuario){
    return res.status(500).json({
        msg:'Se quiere verificar el rol sin antes validar el token'
    })
}

const {rol,nombre}=req.usuario

if (rol !='ADMIN_ROLE'){
    return res.status(401).json({
        msg:`${nombre} no tiene los privilegios necesarios para ejecutar esta operacion`
    })
}

  next()
}


const tieneRol=(...roles)=>{
return (req,res=response,next)=>{
    

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin antes validar el token'
        })
    }

if(!roles.includes(req.usuario.rol)){
    return res.status(401).json({
        msg:'Usuario no cuenta con los permisos necesarios'
    })
}

    next()
}
}

module.exports={
    esAdminRol,
    tieneRol
}