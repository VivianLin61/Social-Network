const { AuthenticationError, UserInputError } = require('apollo-server')
const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)

      if (body.trim() === '') {
        throw new Error('Post body must not be empty')
      }

      const newPost = new Post({
        body,
        userId: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        profileImage: user.profileImage,
      })

      const post = await newPost.save()

      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if (user.id === post.userId.toString()) {
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likePost(_, { postId }, context) {
      const { username, id } = checkAuth(context)

      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find((like) => like.userId === id)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.userId !== id)
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
            userId: id,
          })
        }

        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
  },
}
