// aqui se listan llas consultas (funciones que retornan datos)y mutaciones (funciones que alteran datos) que podemos hacer en la api
// ⇊⇊⇊ para poder definir consultas y migraciones ⇊⇊⇊
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { users, user , posts, post, comments, comment } = require('./queries')
const {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment} = require('./mutations')
// con new graphqlSchema permite crear consultas y mutaciones

// crear una consulta
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root QueryType",
        fields:{
            users, 
            user,
            posts,
            post,
            comments,
            comment
        },
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root MutationType",
        fields:{
            register,
            login,
            user,
            createPost,
            updatePost,
            deletePost,
            createComment,
            updateComment,
            deleteComment
        },       
})


// exportar schema creado

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,


});


