const {GraphQLList, GraphQLID, GraphQLString} = require('graphql');
const {userType,postType} = require('./types');
const {User, Post} = require('../models');

const users = {
    // nos va a devolver una lista de usaruios
    type: new GraphQLList(userType),
    description: 'Return a list of Users',
    async resolve ()  { // asincrono xq consulta a la bd
        // const users = await User.find();
        // console.log(users)
        return User.find();
    }
}

const user = {
    type: userType,
    description: 'get user by id',
    args:{
        id: {type: GraphQLID},
        displaname: {type: GraphQLString}
    },
    // pasamos los argumentos por el resolve
    resolve (_,args) {
        console.log(args)
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(postType),
    description: 'Get all Posts',
    resolve: async() => Post.find(),   
}

const post = {
    type: postType,
    description: 'get post by id',
    args:{
        id: {type: GraphQLID},
    },
    async resolve (_,args) {
        console.log(args)
        return Post.findById(args.id)
    }

}


// para exportar
module.exports = { users, user, posts, post };