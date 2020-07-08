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
        editid: {
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

module.exports = PostType