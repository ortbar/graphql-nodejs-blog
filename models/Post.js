// esquema de publicaciones - Post Schema
const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    authorId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    } ,
    body:{
        type: String,
        required: true
    },
}, {
    timestamps:true
    
})

//definir modelo con el esquema creado

module.exports = model("Post", postSchema);

