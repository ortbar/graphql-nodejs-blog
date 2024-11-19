//generador de token

const jwt = require('jsonwebtoken')


//necistamos usario para psarlo como parametro, para generar token

const createJWTtoken = user => {
    // sign necesita un usuario, un secret y opciones como duracion, etc
   return jwt.sign({user}, 'hola123', {
    expiresIn: '1h',
    })
}

// exportar...
module.exports = { createJWTtoken,

 }