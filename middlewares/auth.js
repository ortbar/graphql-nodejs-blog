const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    // usando la extension para navegador modheader, creamos un header cabecera de autorizacion (de normal lo haria la aplicacion frontend)
    // authorization: 'Bearer '
    // si la autorizacion existen, hacemos split de bearer ... y nos quedamos con el token sólo
    const token = req.headers.authorization?.split(" ")[1];
    try {
            // para decodificar el token y extraer el usuario usamos jsonwebtoken, esto decodifica un objeto verified
        const verified = jwt.verify(token, "hola123")
        console.log(verified)
        req.verifiedUser = verified.user
        next();  
    } catch (error) {
        // console.log(error)
        next();
    }   
} 

// lo exportamos para usarlo en server, donde lo requerimos
module.exports = {authenticate}

// definir middleware
