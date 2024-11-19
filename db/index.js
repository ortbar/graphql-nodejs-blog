const mongoose = require("mongoose")


//creamos funcion asincrona para conectarnos a la bd
const connectDb = async () => {
    await mongoose.connect('mongodb://localhost/blogdb');
    console.log("Mongodb connected");
}

// y exportamos la funcion como un método
module.exports = { connectDb };


