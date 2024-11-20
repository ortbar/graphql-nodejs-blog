// función de Mongoose que se utiliza para definir la estructura de los documentos dentro de una colección.
// función que permite crear un modelo a partir de un esquema. Este modelo se utiliza para interactuar con la base de datos (crear, leer, actualizar, eliminar datos).
const {Schema, model} = require('mongoose')

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    email:{
        type: String,
        required: true,
        unique:true,
        match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 
        "Provide a valid email address",  
        ],
    },
    displayname:{
        type:String,
        required:true,
    },
},
{
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false
}
);

// traemos la funcion model y definimos modelo "User"con el valor del  esquema creado y lo exportamos
module.exports = model("User", userSchema);

