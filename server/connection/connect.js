const mongoose = require('mongoose')

const mongoConnect = (URL) => {
  mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  const Connection = mongoose.connection
  Connection.on('error', err => console.log('Error', err))
  Connection.once('open', () => console.log('Connected DB!'))
  return true
}

module.exports = { mongoConnect }