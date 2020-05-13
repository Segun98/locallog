const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat
} = graphql


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        titleurl: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        count: {
            type: GraphQLFloat
        },
        url: {
            type: GraphQLString
        },
        metaDesc: {
            type: GraphQLString
        },
        authorProfile: {
            type: GraphQLString
        }
    })
});




// const UsersType = new GraphQLObjectType({
//     name: 'Users',
//     fields: () => ({
//         id: {
//             type: GraphQLID
//         },
//         email: {
//             type: GraphQLString
//         },
//         fullname: {
//             type: GraphQLString
//         },
//         password: {
//             type: GraphQLString
//         },
//         posts: {
//             type: new GraphQLList(PostType),
//             resolve(parent, args) {
//                 return posts.filter(post => post.email === parent.email)
//             }
//         }
//     })
// });


module.exports = PostType