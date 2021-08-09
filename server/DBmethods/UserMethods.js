require('dotenv').config()
const User = require("../Schema/User");
const { customValidator } = require("../validations/user-actions-validator");
const { REGISTER_USER, VERIFY_USER, FETCH_USERS, SEND_MESSAGE, GET_CHAT_BY_ID } = require("./constants")
const jwt = require('jsonwebtoken')

const userAction = async(type, data, client) => {
  switch(type){
    case REGISTER_USER:  
      const errors = await customValidator(data, type)
      if(errors){
        return client.send(JSON.stringify({
          status: '401',
          errors,
          message: 'error'
        }))
      }
      const user = new User(data)
      user.save()
      const accessToken = jwt.sign(data, process.env.ACCESS_SECRET_KEY)
      client.send(JSON.stringify({ 
        status: 200,
        errors: [],
        message: 'registered',
        accessToken,
        id: user._id
      }))
    break;
    case VERIFY_USER:
      try {
        jwt.verify(data, process.env.ACCESS_SECRET_KEY, (err) => {
          if(err){
            client.send(JSON.stringify({ message: 'Invalid Token' }))
            return client.close()
          }
          client.send(JSON.stringify({ message: 'Valid Token' }))
        })
      } catch (e) {
        throw e
      }
     case FETCH_USERS:
       try {
         const users = await User.find()
         const filtredUsers = users.filter(el => {
           return el.name
           .toLowerCase()
           .includes(data.toLowerCase())
         })
         client.send(JSON.stringify({
          users: filtredUsers,
          message: 'Users'
        }))
       } catch (e) {
         throw e
       }
      case SEND_MESSAGE:
        try {
          let chatIndex;
          const datas = await User.find({ '_id': { $in: data.ids } })
          const isExistChat = () => {
            let has = false
            datas.forEach((u) => {
              u._doc.chats.forEach((c, idx) => {
                if(c.ids.includes(data.ids[0]) && c.ids.includes(data.ids[1])){
                  chatIndex = idx
                  has = true
                }
              })
            })
            return has
          }
          
          if(datas.length){
            data.ids.forEach(async (id) => {
              if(!isExistChat()){
                return await User.findOneAndUpdate(
                  {'_id': id},
                  { '$push': {chats: [{
                    ids: data.ids,
                    messages: [data.message]
                  }]} }
                )
              }

              return await User.findOneAndUpdate(
                {'_id': id},
                { '$push': { [`chats.${chatIndex}.messages`]: data.message }}
              )
            })
          }
        } catch (e) {
          throw e
        }
      case GET_CHAT_BY_ID:
        try {
          console.log(data)
          const user = await User.findById(data)
          client.send(JSON.stringify({
            message: 'chatById',
            chat: user
          }))
        } catch (e) {
          throw e
        }
    default:
      return {}
  }
}

module.exports = {
  userAction
}