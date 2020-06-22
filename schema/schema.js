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
const Posts = require('../models/posts')
const Comments = require('../models/comments')


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        editid:{
            type: GraphQLString
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




const CommentType = new GraphQLObjectType({
    name: 'Comments',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        postid: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        comment: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    })
});


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

                return Posts.findOne({titleurl:args.titleurl})
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

               return await Posts.find({
                    $or: [{
                        author:{$regex: args.author,$options:'i'}
                    }, {
                        title:{$regex: args.title,$options:'i'}
                    }]
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
                return await Posts.findOne({editid:args.editid})
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
                    type: new GraphQLNonNull(GraphQLString)
                },
                editid: {
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

                } else {
                    let post = new Posts({
                        titleurl: args.titleurl,
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

            }
        },
        makeComment: {
            type: CommentType,
            args: {
                postid: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                comment: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                date: {
                    type: new GraphQLNonNull(GraphQLString)
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
                    type: new GraphQLNonNull(GraphQLString)
                },
                editid: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorProfile: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                url: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async function (parent, args) {
                await Posts.findOneAndUpdate({
                    editid: args.editid
                }, {
                    $set: {
                        description: args.description,
                        authorProfile: args.authorProfile,
                        url:args.url
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