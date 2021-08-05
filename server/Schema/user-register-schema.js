const yup = require('yup')

const userRegisterSchema = yup.object({
  name: yup.string().required().min(2).max(15),
  email: yup.string().required().email('Invalid email'),
  password: yup.string().required().min(4).max(20)
})

module.exports = { userRegisterSchema  }