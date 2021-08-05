const ws = require('ws')
require('dotenv').config()
const { mongoConnect } = require('./connection/connect')
const { userAction } = require('./DBmethods/UserMethods')

const wss = new ws.Server({ port: 8200 })

wss.on('connection', async (wsClient) => {

  const con = await mongoConnect(process.env.MONGO_URI)
  if(!con){
    console.log('fail')
    return
  }
  wsClient.on('message', async (m) => {
    const { type, data } = JSON.parse(m)
    userAction(type, data, wsClient)
    console.log(data)
  })
  
  wsClient.on('close', () => {
    console.log('connection close')
  })
})