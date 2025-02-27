const { Schema, model } = require('mongoose');

let schema = new Schema({
    nombre : {
        type: String,
        require: true
    },
    descripcion  : {
        type: String
    },
    urlImagen: {
        type: String,
        default : 'https://cookmepal.allianzcloud.com/public/frontend/img/default-img.png'
    },
    calificacion :{
        type: Number,
        require : true
    },
    fechaEstreno: {
        type: Date
    }
});

module.exports = model('Pelicula', schema);