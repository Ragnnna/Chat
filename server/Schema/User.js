const mongoose = require('mongoose')

const User = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  chats: {
    type: Array,
    require: true,
  },
  blockedUsers: {
    type: Array,
    require: true
  },
  muttedUsers: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('User', User)