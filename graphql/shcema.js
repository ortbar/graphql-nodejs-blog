// aqui se listan llas consultas (funciones que retornan datos)y mutaciones (funciones que alteran datos) que podemos hacer en la api
// ⇊⇊⇊ para poder definir consultas y migraciones ⇊⇊⇊
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { users } = require('./queries')
const {register, login} = require('./mutations')
// con new graphqlSchema permite crear consultas y mutaciones

// crear una consulta
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root QueryType",
        fields:{
            users, 
        },
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root MutationType",
    fields:{
        register,
        login,
    }

})


// exportar schema creado

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,


});


