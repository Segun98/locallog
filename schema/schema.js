const graphql = require('graphql')
const {
    posts,
    users
} = require('./dummydb')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
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
        }

    })
});

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        fullname: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return posts.filter(post => post.email === parent.email)
            }
        }
    })
});


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
            resolve(parent, args) {
                return posts.find(post => post.id === args.id)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return posts
            }
        },
        user: {
            type: UsersType,
            args: {
                email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return users.find(user => user.email === args.email)
            }
        },
        users: {
            type: new GraphQLList(UsersType),
            resolve() {
                return users
            }
        },

    }

})


module.exports = new GraphQLSchema({
    query: RootQuery
})