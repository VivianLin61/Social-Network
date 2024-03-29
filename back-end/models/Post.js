const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      image: String,
      userId: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
      userId: String,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
})

module.exports = model('Post', postSchema)
