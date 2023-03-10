const express = require('express')
const fileUpload=require('express-fileupload')
//import express from 'express'
//import cors from 'cors'
const cors =require('cors')
const { dbConnection } = require('../database/config')

class Server{  


constructor(){
     this.app = express()
     this.port=process.env.PORT

     //this.usuariosPath='/api/usuarios'
     //this.authPath='/api/auth'
     


     this.paths={
auth:'/api/auth',
buscar:'/api/buscar',
categorias:'/api/categorias',
productos:'/api/productos',
usuarios:'/api/usuarios',
uploads:'/api/uploads'
     }

    //Conexion a DB
    this.conectarDB()

     //Middlewares
    this.middlewares()

     //Rutas de la aplicacion
     this.routes()
    }


async conectarDB(){
    await dbConnection()
}
middlewares(){
    //CORS
    this.app.use(cors())

    //lectura y parseo de body
    this.app.use(express.json())
    
    //Directorio publico
this.app.use(express.static('public'))

//File Uploads o Carga de archivos

this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}));


}


routes(){
this.app.use(this.paths.auth,require('../routes/auth'))
this.app.use(this.paths.buscar,require('../routes/buscar'))
this.app.use(this.paths.categorias,require('../routes/categorias'))
this.app.use(this.paths.productos,require('../routes/productos'))
this.app.use(this.paths.usuarios,require('../routes/usuarios'))
this.app.use(this.paths.uploads,require('../routes/uploads'))
}


listen(){
    this.app.listen(this.port,()=>{
        console.log('Sevidor corriendo en el puerto',this.port)
    })
}


}

module.exports=Server