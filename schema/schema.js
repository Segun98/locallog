const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat
} = graphql
const Posts = require('../models/posts')
const Comments = require('../models/comments')
const CommentType = require("./CommentType")
const PostType = require("./PostType")

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

                return Posts.findOne({
                    titleurl: args.titleurl
                })
            }
        },
        posts: {
            type: GraphQLList(PostType),
            resolve() {
                return Posts.find().sort({
                    createdAt: "desc"
                })
            }
        },
        latest: {
            type: GraphQLList(PostType),
            resolve() {
                return Posts.find().sort({
                    createdAt: "desc"
                }).limit(5)
            }
        },
        popular: {
            type: GraphQLList(PostType),
            resolve() {
                return Posts.find().sort({
                    count: -1
                }).limit(6)
            }
        },
        search: {
            type: GraphQLList(PostType),
            args: {
                author: {
                    type: GraphQLString
                },
                title: {
                    type: GraphQLString
                }

            },
            resolve: async function (parent, args) {

                return await Posts.find({
                    $or: [{
                        author: {
                            $regex: args.author,
                            $options: 'i'
                        }
                    }, {
                        title: {
                            $regex: args.title,
                            $options: 'i'
                        }
                    }]
                }).sort({
                    createdAt: "desc"
                })

            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                return Comments.find()
            }
        },
        postToEdit: {
            type: PostType,
            args: {
                editid: {
                    type: GraphQLString
                }
            },
            resolve: async function (parent, args) {
                return await Posts.findOne({
                    editid: args.editid
                })
            }
        },
    }

})



const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: {
                    type: GraphQLNonNull(GraphQLString)
                },
                editid: {
                    type: GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
                date: {
                    type: GraphQLNonNull(GraphQLString)
                },
                category: {
                    type: GraphQLNonNull(GraphQLString)
                },
                author: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                count: {
                    type: GraphQLNonNull(GraphQLFloat)
                },
                url: {
                    type: GraphQLNonNull(GraphQLString)
                },
                metaDesc: {
                    type: GraphQLNonNull(GraphQLString)
                },
                authorProfile: {
                    type: GraphQLString
                },
                titleurl: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (parent, args) {

                let postexists = await Posts.findOne({
                    titleurl: args.titleurl
                })
                let random = Math.floor(Math.random() * 448994)

                let post = new Posts({
                    titleurl: `${postexists? args.titleurl+random : args.titleurl}`,
                    editid: args.editid,
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
        },
        makeComment: {
            type: CommentType,
            args: {
                postid: {
                    type: GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                comment: {
                    type: GraphQLNonNull(GraphQLString)
                },
                date: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (parent, args) {
                let comments = await new Comments({
                    postid: args.postid,
                    email: args.email,
                    name: args.name,
                    comment: args.comment,
                    date: args.date
                })

                return comments.save()
            }
        },
        updatePost: {
            type: PostType,
            args: {
                description: {
                    type: GraphQLNonNull(GraphQLString)
                },
                editid: {
                    type: GraphQLNonNull(GraphQLString)
                },
                authorProfile: {
                    type: GraphQLNonNull(GraphQLString)
                },
                url: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (parent, args) {
                await Posts.findOneAndUpdate({
                    editid: args.editid
                }, {
                    $set: {
                        description: args.description,
                        authorProfile: args.authorProfile,
                        url: args.url
                    },
                });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})