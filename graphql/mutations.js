const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post, Comment } = require('../models')
const {createJWTtoken} = require('../util/auth');
const { postType, commentType } = require("./types");
const {authenticate} = require('../middlewares/auth');
const { findOneAndUpdate } = require("../models/User");
const { findOneAndDelete } = require("../models/Post");

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
    description: 'Log in an user an return a token',
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
};

const createPost = {
    type: postType,
    description: "Create a new post",
    args:{
        title: { type: GraphQLString},
        body: {type:GraphQLString},
        authorId:{ type:GraphQLID}
    },
    async resolve(_, args, {verifiedUser}) {
        console.log(verifiedUser)
        const newPost = new Post({
            title: args.title,
            body: args.body,
// ahora tenemos en el request el verifiedUser, Ya que lo que hemos almacenado ahí tras decodificar el token, del cual podemos extraer su id y lo asignamos a authorID
            authorId:verifiedUser._id,
        })
        await newPost.save()
        return newPost
    }
};

const updatePost = {
    type: postType,
    description: "Update a Post",
    // que datos recibimos para poder acutalizar un post??
    args:{
        id:{ type:GraphQLID},
        title: { type: GraphQLString},
        body: {type:GraphQLString},
    },
    // si existe verifiedUser quiere decir que el usuario que está queriendo actualizar es el mismo que quiere actualizar el post
    // con verifiedUser se esta intentando verificar que el usuario que está intentando actulizar la publicación es el mismo que inicialmente la creó
    async resolve(_, {id,title,body}, {verifiedUser}) {
        console.log(verifiedUser)
        console.log(id,title,body);

        // en este if comprobamos primero:
        //si un/el usuario se ha autenticado (existe un verifiedUser) 
        
        if (!verifiedUser) {throw new Error("Unauthorized")};
        
        // si existe, guardamos en updatedPost el resultado de  buscamos el usuario haciendo consulta a la base de datos buscando al usuario por el id comprobando si el mismo que se pasa por parametros
        // y por el authorId de post, comprobandolo con verfiedUser.authorId, que es tb una propiedad de verifiedUser
        const updatedPost = await Post.findOneAndUpdate(
            {_id: id , authorId: verifiedUser._id }, // busca por ...
            {
                title, // lo que queremos actualizar
                body,            
            },
            {   
                new: true, // new: true devuelve el nuevo objeto actualizado
                runValidators: true
            }
        );
        if (!updatedPost) {
            throw new Error("comentario no encontrado.../ o ...No estás autorizado a actualizar este post. no lo has creado tú");
        }
        return updatedPost;
    },
}

const deletePost = {
    type: GraphQLString,
    description: "Delete a Post",
    args:{
        postId: {type: GraphQLID},
    },
    async resolve(_, {postId}, {verifiedUser}) {

        if (!verifiedUser) {throw new Error("Unauthorized")}; // primeramente, si el usuario no tiene el token, no esta logueado

        // eliminar si existe...
        const deletedPost = await Post.findOneAndDelete({
            _id: postId, 
            authorId: verifiedUser._id // la persona que quiere eliminar el post es el mismo que lo creó?? se compara el idauthor de post con el id de verfiedUser
        });

        if(!deletedPost) throw new Error("Post not found");

        return "Post deleted";
    }   
}

const createComment = {
    type: commentType,
    description: "Add a comment to the post",
    args:{
        comment: {type: GraphQLString},
        postId: {type:GraphQLID},
    },
    async resolve (_, {comment, postId}, {verifiedUser}) {
         const newComment = new Comment({
            comment,
            postId,
            userId: verifiedUser._id // el parametro de user que esta logueado id sd añade en los argumentos apartir de verifedUser
        })

        await newComment.save()
        return newComment
    }
}

const updateComment = {
    type: commentType,
    description: "Update a Comment",
        // que datos recibimos para poder acutalizar un comment??
    args:{
        id:{type:GraphQLID},
        comment:{ type:GraphQLString},
    },
   async resolve(_, {id,comment}, {verifiedUser}) {

        if (!verifiedUser) {throw new Error("Unauthorized")};

        const commentUpdated = await Comment.findOneAndUpdate(
            {_id: id , userId: verifiedUser._id }, // busca por ...
            {
                comment, // lo que queremos actualizar            
            },
            {   
                new: true, // new: true devuelve el nuevo objeto actualizado
                runValidators: true
            }
        );

        if(!commentUpdated) {throw new Error("comentario no encontrado..por ejemplo")};

        return commentUpdated;
    }
}

const deleteComment = {
    type: GraphQLString,
    description: "Delete a Comment",
    args:{
        id: {type: GraphQLID},
    },
    async resolve(_, {id}, {verifiedUser}) {
        if (!verifiedUser) {throw new Error("Unauthorized")}; 

        const deletedComment = await Comment.findOneAndDelete({
            _id: id, 
            userId: verifiedUser._id // la persona que quiere eliminar el comment es el mismo que lo creó?? se compara el idauthor de post con el id de verfiedUser
        });

        if(!deletedComment) throw new Error("comment not found");

        return "Comment deleted";
    }

}



// exportamos las mutaciones para poder importarlas en el schema de graphql pero a traves de un objeto, ya que seran varias mutaciones
module.exports = {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment
}