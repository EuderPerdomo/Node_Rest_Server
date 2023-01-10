
//const { Categoria } = require('../models')
const Role=require('../models/role')
//const Usuario=require('../models/usuario')
const {Usuario,Categoria,Producto}=require('../models')

const esRolValido=async (rol='')=>{
    const existRol=await Role.findOne({rol})
    if(!existRol){
      throw new Error(`el rol ${rol} no es valido`)
    }
        }

const emailExiste=async(correo='')=>{

  const existeEmail=await Usuario.findOne({correo})
  if (existeEmail){
      throw new Error(`el Correo ${correo} ya se encuentra registrado en la base de datos`)
  }
}


const existeUsuarioPorId=async(id)=>{

  const existeUsuario=await Usuario.findById(id)
  if (!existeUsuario){
      throw new Error(`el Id ${id} no existe en la base de datos`)
  }
}

const existeCategoriaPorId=async(id)=>{
  const existeCategoria=await Categoria.findById(id)
  if (!existeCategoria){
      throw new Error(`el Id ${id} no existe en la base de datos`)
  }
}

const existeProductoPorId=async(id)=>{
  const existeproducto=await Producto.findById(id)
  if (!existeproducto){
      throw new Error(`el Id ${id} no existe en la base de datos`)
  }
}


//Validar colecciones permitidas

const coleccionesPermitidas=(coleccion='',colecciones=[])=>{
const incluida=colecciones.includes(coleccion)
if(!incluida){
  throw new Error(`la coleccion ${coleccion} no esta permitida, las permitidas son: ${colecciones}`)
}
return true
}


        module.exports={
            esRolValido,
            emailExiste,
            existeUsuarioPorId,
            existeCategoriaPorId,
            existeProductoPorId,
            coleccionesPermitidas
        }