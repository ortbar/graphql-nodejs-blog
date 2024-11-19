const { GraphQLString } = require("graphql");
const { User } = require('../models')
const {createJWTtoken} = require('../util/auth')

const register = {
    type: GraphQLString,
    description: "register a new user and returns a token",
    // para pasar datos usamos args
    args:{
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        displayname: { type: GraphQLString},
    },
    async resolve(_, args) {
        console.log(args) // es como es el request.body
        const {username, email, password, displayname} = args
        const newUser = new User({username  , email, password, displayname});
        await newUser.save()
        // al crear un usuario genera token, obviando el password, ya que puede ser desencriptado
        const token = createJWTtoken({_id: newUser.id, email:newUser.email, displayname: newUser.displayname})
        return token;
    },
};

// exportamos pero a traves de un objeto, ya que seran varias mutaciones
module.exports = {register,
}