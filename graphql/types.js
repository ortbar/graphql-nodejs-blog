// aqui vamos a definir nuestros tipos de datos, un new graphqlObjectType para definir nuestros tipos de datos
 // que tambien se usa para definir el schema /instanciar para crear las queries y mutations

const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql"); //
const {User} = require('../models')

// para el autocompletado en el graphiql, como un esquema de usuario
const userType = new GraphQLObjectType({
    name: 'UserType',
    description : 'The user type',
    fields:{
        id: {type:GraphQLID},
        username: {type:GraphQLString},
        email: {type:GraphQLString},
        displayname: {type:GraphQLString},
        password: {type:GraphQLString},
        createdAt: {type:GraphQLString},
        updatedAt:{type:GraphQLString}
    }
})

// qué tipo de dato es una publicación, qué voy a querer consultar de una post? // lo definimos...
const postType = new GraphQLObjectType({
    name: 'postType',
    description : 'The post type',
    fields:{
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        author:{type: userType, resolve(parent){
            // mas arriba requerimos el modelo user para poder usarlo aqui...
             // parent se refiere a post (authorId seria hijo de post..) y dentro de post buscamos en la bd con la consulta findById por el id del autor
            return User.findById(parent.authorId)
        }},
    },
});

// para poder exportarlo
module.exports = {
    userType,
    postType};
