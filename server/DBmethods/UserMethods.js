require('dotenv').config()
const User = require("../Schema/User");
const { customValidator } = require("../validations/user-actions-validator");
const { REGISTER_USER, VERIFY_USER, FETCH_USERS, SEND_MESSAGE } = require("./constants")
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
           return el.name.toLowerCase().includes(data.toLowerCase())
         })
         client.send(JSON.stringify( { users: filtredUsers, message: 'Users' }))
       } catch (e) {
         throw e
       }
      case SEND_MESSAGE:
        try {
          console.log(data)
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