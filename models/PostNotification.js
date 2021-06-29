const { model, Schema } = require('mongoose')

const postNotificationSchema = new Schema({
  read: Boolean,
  message: String,
  postId: String, //The post that triggered the notification
  createdAt: String,
  userId: String, //User who will recieve the notification
  active: Boolean, //If the user has clicked on the notifcation
})

module.exports = model('PostNotification', postNotificationSchema)
