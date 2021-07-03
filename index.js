const { ApolloServer, PubSub } = require('apollo-server-express')
const env = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { graphqlUploadExpress } = require('graphql-upload')
const path = require('path')
const PORT = process.env.port || 5000
const cors = require('cors')
env.config()
// console.log(process.env.MONGO_URI)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  uploads: false,
})

const app = express()
app.use(express.static('public'))
app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }))
app.use(cors())
server.applyMiddleware({ app })

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected')
    return app.listen({ port: process.env.PORT || 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${PORT}`)
  })
  .catch((err) => {
    console.error(err)
  })
