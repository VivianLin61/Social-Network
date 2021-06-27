const { model, Schema } = require('mongoose')

const postNotificationSchema = new Schema({
  read: Boolean,
  message: String,
  postId: String, //The post that triggered the notification
  createdAt: String,
  userId: String, //User who will recieve the notification
})

module.exports = model('PostNotification', postNotificationSchema)
