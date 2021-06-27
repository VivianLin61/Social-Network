const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
const { GraphQLUpload } = require('graphql-upload')
module.exports = {
  FileUpload: GraphQLUpload,
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  User: {
    // fullName: (parent) => parent.firstName + parent.lastName,
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
}
