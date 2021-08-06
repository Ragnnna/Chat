import React, { useContext, useEffect, useState } from 'react'
import '../components.css'
import { Message } from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MESSAGES } from '../../store/constants'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import InfoIcon from '@material-ui/icons/Info'
import BlockIcon from '@material-ui/icons/Block'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import { UserContext } from '../../App'
import { useHistory } from 'react-router-dom'
import { useCustomConnection } from '../../hooks/useCustomConnection'

const Chat = () => {
  const { users } = useSelector(state => state.users)
  const context = useContext(UserContext)
  const history = useHistory()
  const dispatch = useDispatch()
  const { messages } = useSelector(state => state.messages)
  const [ userData, setUserData ] = useState({
    author: 'Me',
    message: ''
  })
  const userId = history.location.pathname.split('/chat/')[1]
  const { connection } = useCustomConnection('ws://localhost:8200', context.token)
  useEffect(() => {
    if(connection){
      connection.send(JSON.stringify({ type: 'FETCH_USER', data: userId }))
    }
  }, [connection, userId])

  const mappedMessages = messages
  .map(el =>
    <Message 
      key={el}
      author={el.author}
      message={el.message}
    />
  )

  const submitHandler = async (e) => {
    if(!e || e.key === 'Enter'){
      if(!userData.message.trim()){
        return setUserData(state => ({ 
          ...state,
          message: ''
        }))
      }
      connection.send(JSON.stringify({
        type: 'SEND_MESSAGE',
        data: {
          ids: [userId, context.UID],
          dateAdd: Date.now(),
          message: userData.message
        }
      }))
      connection.onmessage = async(m) => {
        dispatch({ 
          type: SET_MESSAGES,
          payload: JSON.parse(m.data)
        })
      }
      setUserData(state => ({
        ...state,
        message: ''
      }))
    }
  }

  const changeHandler = (e) => {
    const { value } = e.target
    setUserData(state => ({ ...state, message: value }))
  }

  return (
    <div className="chat-block">
      <div className="chat-interface">
        <div className="chat-bar">
          {mappedMessages}
        </div>
        <div className="chat-form">
          <div className="input-wrapper inline">
            <input
              onKeyPress={submitHandler}
              onChange={changeHandler}
              value={userData.message}
              type="text"
              className="input-chat"
            />
          </div>
          <button
            onClick={() => submitHandler(null)}
            className="btn-send"
          >
            Send
          </button>
        </div>
      </div>
      <div className="profile-chat">
        <div className="header-profile-chat">
          <p className="profile-chat-status">status</p>
        </div>
        <div className="profile-info">
          <div className="profile-name  profile-info-block">
            <div className="profile-text-wrapper">
              <span>Name</span>
            </div>
            <div className="icon-wrapper">
              <AccountBoxIcon
                style={{
                  color: 'rgb(76, 75, 119)',
                  fontSize: 60
                }}
              />
            </div>
          </div>
          <div className="profile-about profile-info-block">
            <div className="profile-text-wrapper">
              <span>Name</span>
            </div>
            <div className="icon-wrapper">
              <InfoIcon
                style={{
                  color: 'rgb(46, 73, 80)',
                  fontSize: 60,
                }}
              />
            </div>
          </div>
          <div className="profile-actions">
            <div className="sound-off-action actions">
              <div className="icon-action-wrapper">
                <VolumeOffIcon
                  style={{
                    fontSize: 80,
                  }}
                />
              </div>
              <div className="text-action-wrapper">
                <p>mute</p>
              </div>  
            </div>
            <div className="block-action actions">
              <div className="icon-action-wrapper">
                <BlockIcon
                  style={{
                    fontSize: 80,
                    verticalAlign: 'middle'
                  }}
                />
              </div>
              <div className="text-action-wrapper second-action">
                <p>block</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Chat }