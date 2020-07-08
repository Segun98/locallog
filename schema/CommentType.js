const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql

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

module.exports = CommentType;