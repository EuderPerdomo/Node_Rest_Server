const dbvalidators=require('./dbvalidators')
const generarJWT=require('./generar_jwt')
const googleVerify=require('./google_verify')
const subirArchivo=require('./subir-archivo')

module.exports={
    ...dbvalidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}