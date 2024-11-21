const {GraphQLList, GraphQLID} = require('graphql');
const userType = require('./types');
const {User} = require('../models');

const users = {
    // nos va a devolver una lista de usaruios
    type: new GraphQLList(userType),
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

// para exportar
module.exports = { users, user };