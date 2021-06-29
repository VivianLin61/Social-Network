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
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
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
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addProfileImage(_id: String!, file: FileUpload!): User!
    createNotification(
      message: String!
      postId: String!
      userId: String!
    ): PostNotification!
  }
`
