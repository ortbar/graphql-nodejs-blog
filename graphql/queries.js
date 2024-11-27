const {GraphQLList, GraphQLID} = require('graphql');
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
    description: 'get a user by id',
    args:{
        id: {type: GraphQLID},
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
     resolve:() => Post.find()

    
}

// para exportar
module.exports = { users, user, posts };