const graphql = require('graphql')
// const {
//     posts,
//     users
// } = require('./dummydb')
const Posts = require('../models/posts')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = graphql



const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {
            type: GraphQLID
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
            type : GraphQLFloat
        },
        url: {
            type : GraphQLString
        },
        metaDesc: {
            type : GraphQLString
        },
        authorProfile: {
            type : GraphQLString
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


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: async function (parent, args) {
                
              await Posts.findOneAndUpdate({_id:args.id}, { $inc: { count: 1 },});

                const posts = await Posts.findById(args.id)
                return posts
                // return posts.find(post => post.id === args.id)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return Posts.find()
                // return posts
            }
        }
        // user: {
        //     type: UsersType,
        //     args: {
        //         email: {
        //             type: GraphQLString
        //         }
        //     },
        //     resolve(parent, args) {
        //         return users.find(user => user.email === args.email)
        //     }
        // },
        // users: {
        //     type: new GraphQLList(UsersType),
        //     resolve() {
        //         return users
        //     }
        // },

    }

})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                date: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                category: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                author: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                count: {
                    type: new GraphQLNonNull(GraphQLFloat)
                },
                url: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                metaDesc: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorProfile: {
                    type: GraphQLString
                }
            },
            resolve(parent, args){

                let post = new Posts({
                    title: args.title,
                    description: args.description,
                    date: args.date,
                    category: args.category,
                    author: args.author,
                    email: args.email,
                    count: args.count,
                    url: args.url,
                    metaDesc: args.metaDesc,
                    authorProfile: args.authorProfile
                });
                return post.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}) 