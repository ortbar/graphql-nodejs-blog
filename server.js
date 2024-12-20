//AQUi creamos en el servidor de express, un mensaje de bienvenida y otro endpoint para la api de grahpql para procesar multiples consultas a traves de una sola ruta


const express = require('express')
// para procesar multiples consultas atraves de una sola ruta
const {graphqlhttp, graphqlHTTP} = require('express-graphql')
// requerir en nuestro servir el schema creado en grapql/schema
const schema = require('./graphql/shcema')
//requerir la conexion a la bd
const { connectDb } = require('./db')
const {authenticate } = require('./middlewares/auth')

connectDb();

const app = express()
// antes de pasar por las rutas pasará por authenticate, no permite avanzar si no hay autenticacion
app.use(authenticate)
app.listen(3000)
console.log('server running on port 3000')

// para proteger las rutas, diseñamos un middleware que se ejecutará antes de que llegue a las rutas

app.get('/',(req, res) => {
    res.send('Bienvenido a my api graphql')
})

// cuando pases por cualquier tipo de peticion, se va a ejecutar lo siguiente, que s como una interfaz para realizar las consultas
// ésto espera una configuración en un objeto Schema y graphiql que es la interfaz para consultar consas
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}))

