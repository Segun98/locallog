const graphql = require('graphql')
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
const PostType = require('./querytypes')

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

                await Posts.findOneAndUpdate({
                    _id: args.id
                }, {
                    $inc: {
                        count: 1
                    },
                });

                const posts = await Posts.findById(args.id)
                return posts
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return Posts.find()
            }
        }
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
            resolve(parent, args) {

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