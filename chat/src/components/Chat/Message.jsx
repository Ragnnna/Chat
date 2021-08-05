import React from 'react'
import '../components.css'

const Message = (props) => {
  const { message } = props

  return (
    <div className="message-wrapper">
      <div
        style={{ float: 'left' }}
        className="chat-message"
      >
        <p>{ message }</p>
      </div>
    </div>
  )
}

export { Message }
