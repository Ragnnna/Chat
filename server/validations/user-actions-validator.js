const { REGISTER_USER } = require("../DBmethods/constants")
const { userRegisterSchema } = require('../Schema/user-register-schema')

const customValidator = (data, type) => {
  switch(type){
    case REGISTER_USER:
      const valid = userRegisterSchema
      .validate({ 
        name: data.name,
        email: data.email,
        password: data.password
      })
      .then(d => null)
      .catch(err => {
        const { errors } = err
        return errors
      })
      return valid
    break;
    default:
      return 'error not found.'
  }
  
}

module.exports = {
  customValidator
}