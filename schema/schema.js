const graphql = require('graphql')
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
                titleurl: {
                    type: GraphQLString
                }
            },
            resolve: async function (parent, args) {

                await Posts.findOneAndUpdate({
                    titleurl: args.titleurl
                }, {
                    $inc: {
                        count: 1
                    },
                });

                const posts = await Posts.findById(args.titleurl)
                return posts
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve() {
                return Posts.find()
            }
        },
        search: {
            type: new GraphQLList(PostType),
            args: {
                author: {
                    type: GraphQLString
                },
                title: {
                    type: GraphQLString
                }

            },
            resolve: async function (parent, args) {

                const search = await Posts.find({
                    $or: [{
                        author: args.author
                    }, {
                        title: args.title
                    }]
                })

                return search
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
                },
                titleurl: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (parent, args) {

                let postexists = await Posts.findOne({
                    titleurl: args.titleurl
                })
                let random = Math.floor(Math.random() * 448994)
                if (postexists) {
                    let post = new Posts({
                        titleurl: `${args.titleurl}-${random}`,
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

                } else {
                    let post = new Posts({
                        titleurl: args.titleurl,
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
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})