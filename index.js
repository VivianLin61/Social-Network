const { ApolloServer, PubSub } = require('apollo-server')
const env = require('dotenv')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const PORT = process.env.port || 5000

env.config()
// console.log(process.env.MONGO_URI)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
