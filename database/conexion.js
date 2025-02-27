var mongoose = require("mongoose");

var servidor = "localhost:27017";
var nombreBaseDatos = "peliculas";

class Database {
    constructor() {
        this.conectar();
    }

    async conectar() {
        try {
            mongoose.set('strictQuery', true);
            await mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`);
            console.log('Conexion lista')
        } catch (error) {
            console.error(JSON.stringify(error))
        }
    }

    async conexionMongoAtlas() {
        try {
            await mongoose.connect(`mongodb+srv://leonardo:calix1994@bloggerweb-ykwq4.mongodb.net/BloggerWeb?retryWrites=true&w=majority`);
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }
}


module.exports = new Database();