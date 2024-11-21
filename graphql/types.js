// aqui vamos a definir nuestros tipos de datos, un new graphqlObjectType para definir nuestros tipos de datos
 // que tambien se usa para definir el schema /instanciar para crear las queries y mutations

const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql"); //


// para el autocompletado en el graphiql, como un esquema de usuario
const userType = new GraphQLObjectType({
    name: 'UserType',
    description : 'The user type',
    fields:{
    id: {type:GraphQLID},
    username: {type:GraphQLString},
    email: {type:GraphQLString},
    password: {type:GraphQLString},
    createdAt: {type:GraphQLString},
    updatedAt:{type:GraphQLString}
    }
})

// para poder exportarlo
module.exports = userType;
