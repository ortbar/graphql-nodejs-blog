// aqui vamos a definir nuestros tipos de datos, un new graphqlObjectType para definir nuestros tipos de datos
 // que tambien se usa para definir el schema /instanciar para crear las queries y mutations

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql"); //
const {User, Post, Comment} = require('../models')

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
    // para evitar el error de referencia circular, se retrasa la inicializacion de comments,
    // permitiendo que el objeto fields sea una funcion. Esto retrasa completamente la resolución de las definiciones de los campos hasta que todos los tipos estén completamente definidos.
    // se convierte a fields en una funcion () => (), de forma que va a ser ejecutada sólo cuando sea llamado el tipo de dato.
    // Se puede llamar a commentType, sin la necesidad de que esté creado antes
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        author:{type: userType,
         resolve(parent){
            // mas arriba requerimos el modelo user para poder usarlo aqui...
             // parent se refiere a post (authorId seria hijo de post..) y dentro de post buscamos en la bd con la consulta findById por el id del autor
            return User.findById(parent.authorId)
            },
        },
        comments: {
        type:new GraphQLList(commentType),   // para evitar el error de referencia circular (se esta llamando a commentType antes de ser declarado), se convierte a fields en una funcion, de forma que va a ser ejecutada sólo cuando sea llamado el tipo de dato. Se puede llamar a commentType, sin la necesidad de que esté creado antes.                                                    // se retrasa la inicializacion de comments permitiendo que el objeto fields sea una funcion.                                                 // Ésto retrasa completamente la resolución de las definiciones de los campos hasta que todos los tipos estén completamente definidos.                                                    
            resolve(parent) {
            // busca todos los comentarios a cuyo post pertenece el postid que se le está pasando por parámetros
            return Comment.find({postId:parent.id}) // parent es post
            }
        }
    }),
});

const commentType = new GraphQLObjectType ({
    name: 'commentType',
    description : 'The comment type',
    fields:{
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {type: userType,
            resolve (parent) { // parent en este caso es comment, que guarda userId
            return User.findById(parent.userId)
        }},
        postId: {type: postType,
            resolve(parent) {
            return Post.findById(parent.postId)
        }},
    },
},
)

// para poder exportarlo
module.exports = {
    userType,
    postType,
    commentType};
