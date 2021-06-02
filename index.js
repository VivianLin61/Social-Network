const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const gql = require('graphql-tag')
// const typeDefs = require('./graphql/typeDefs')
// const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')
const Post = require('./models/Post')
const PORT = process.env.port || 5000

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
  .catch((err) => {
    console.error(err)
  })
