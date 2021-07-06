const { gql } = require('apollo-server')

module.exports = gql`
  scalar FileUpload
  type ProfileImage {
    url: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    userId: String!
  }
  type PostNotification {
    id: ID!
    createdAt: String!
    userId: String!
    postId: String!
    message: String!
    read: Boolean!
    active: Boolean!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    image: String!
    userId: String! # user that created the comment
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
    userId: String! # user that created the like
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    profileImage: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
    getUser(userId: ID!): User!
    getNotifications(userId: String!): [PostNotification]
  }

  type S3Payload {
    signedRequest: String!
    url: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(
      _id: String!
      currentPassword: String
      email: String
      password: String
      username: String
      confirmPassword: String
    ): User!
    createPost(body: String): Post!
    deletePost(postId: ID!): String!
    createComment(commenterId: String!, postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addProfileImage(filename: String!, file: FileUpload!): User!
    createNotification(
      message: String!
      postId: String!
      userId: String!
    ): PostNotification!
    updateNotification(id: ID!): PostNotification!
    deleteNotification(id: ID!): String!
    signS3(filename: String, filetype: String): S3Payload!
  }
`
