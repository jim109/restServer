const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {

    return new Promise( (resolve, reject) =>{

        //sacamos la variable archivo que viene del req.files
        const { archivo } = files;
        //recortamo el nombre con el split como limite el punto y asi sacarel jpeg/jpg etc
        const nombreCortado = archivo.name.split('.');
        //Sacamos la extension del archivo el cual esta en la ultima posicion del arreglo
        const extension = nombreCortado[nombreCortado.length-1];
    
        //validamos que la extension este dentro del arreglo de extensiones que queremos recibir
        if( !extensionesValidas.includes(extension) ){
            return reject(`La extension ${ extension } no es permitida, recibimos ${ extensionesValidas }` )
            
        }
        //creamos un nombre temporal con uuid adicionamos el punto y el nombre de la extension
        //con esto cambiamos el nombre con el que viene el archivo y colocamos uno aleatorio con uuid
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if(err) {
                return reject(err);
            }
    
            resolve(nombreTemp)
        })
        



    })


}

module.exports = {
    subirArchivo
}