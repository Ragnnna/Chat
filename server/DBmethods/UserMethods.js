require('dotenv').config()
const User = require("../Schema/User");
const { customValidator } = require("../validations/user-actions-validator");
const { REGISTER_USER } = require("./constants")
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
        accessToken
      }))
    break;
    default:
      return {}
  }
}

module.exports = {
  userAction
}