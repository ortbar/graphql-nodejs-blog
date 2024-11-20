const {GraphQLList} = require('graphql');
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

// para exportar
module.exports = { users };