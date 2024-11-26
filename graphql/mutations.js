const { GraphQLString } = require("graphql");
const { User, Post } = require('../models')
const {createJWTtoken} = require('../util/auth');
const { postType } = require("./types");
const {authenticate} = require('../middlewares/auth')

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
        // al crear un usuario genera token, configuramos para que obviando el password, ya que puede ser desencriptado
        const token = createJWTtoken({_id: newUser.id, email:newUser.email, displayname: newUser.displayname})
        return token;
    },
};

const login = {
    type: GraphQLString,
    args:{
        email: { type: GraphQLString},
        password: { type: GraphQLString},
    },
    async resolve(_, args) {
        // comprobar si el usuario existe en la base de datos,..lo buscamos // asincrono, por consultar a la bd // en esta unica consulta decimos que seleccione tb el password con select+password
        const user = await User.findOne({"email":args.email}).select('+password')
        console.log(user);
        if (!user || args.password !== user.password)
        throw new Error("Invalid credentials")
        // si no, se genera token, pero de nuevo sólo en el id, email y displayname
        const token = createJWTtoken({_id: user.id, email:user.email, displayname: user.displayname})
        return token
    },
}

const createPost = {
    type: postType,
    description: "Create a new post",
    args:{
        title: { type: GraphQLString},
        body: {type:GraphQLString},
        authorId:{ type:GraphQLString}
    },
    async resolve(_,args, {verifiedUser}) {
        console.log(verifiedUser)
        const newPost = new Post({
            title: args.title,
            body: args.body,
// ahora tenemos en el request el verifiedUser, Ya que lo que hemos almacenado ahí tras decodificar el token, del cual podemos extraer su id y lo asignamos a authorID
            authorId:verifiedUser._id,
        })
        return newPost
    }


}

// exportamos las mutaciones para poder importarlas en el schema de graphql pero a traves de un objeto, ya que seran varias mutaciones
module.exports = {
    register,
    login,
    createPost,
}