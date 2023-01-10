const path = require('path')
const { v4: uuidv4 } = require('uuid')

const subirArchivo = (files,extensionesValidas= ['png','PNG' ,'jpg', 'jpeg', 'gif'],carpeta='') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files
        const nombreCorto = archivo.name.split('.')
        const extension = nombreCorto[nombreCorto.length - 1]

        //Validar extensiones permitidas
        if (!extensionesValidas.includes(extension)) {
            return reject( `la extension ${extension} no esta permitida, use una de las siguientes: ${extensionesValidas}`)
        }
        const nombreTemporal = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemporal)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            resolve(nombreTemporal)
        });
    })

}

module.exports = {
    subirArchivo
}