const PostNotification = require('../../models/PostNotification')
const checkAuth = require('../../util/check-auth')
module.exports = {
  Query: {
    async getNotifications(_, { userId }) {
      try {
        const notifications = await PostNotification.find({ userId })
      } catch (err) {
        throw new Error(err)
      }
      return 'get notifications'
    },
  },
  Mutation: {
    async createNotification(_, args) {
      const { message, postId, userId } = args
      const newNotification = new PostNotification({
        message,
        postId,
        userId,
        createdAt: new Data().toISOString(),
        read: false,
      })

      const notification = await newNotification.save()

      return notification
    },
  },
}
