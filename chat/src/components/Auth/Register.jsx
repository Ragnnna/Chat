import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import { useCustomRedirect } from '../../hooks/useCustomRedirect'
import '../components.css'

const Register = () => {
  const history = useHistory()
  const connection = useRef(null)
  const context = useContext(UserContext)
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    chats: [],
    blockedUsers: [],
    muttedUsers: []
  })

  useEffect(() => {
    return () => {
      if(!connection.current){
        return
      }
      connection.current.close()
      connection.current = null
    }
  }, [])

  const changeHandler = e => {
    setError('')
    const { name, value } = e.target
    setUser(state => ({ ...state, [name]: value }))
  }

  const { goToUri } = useCustomRedirect('/')

  const submitHandler = (e) => {
    e.preventDefault()
    const ws = new WebSocket('ws://localhost:8200')
    connection.current = ws
    ws.onopen = async (e) => {
      ws.send(JSON.stringify({
        type: 'REGISTER_USER',
        data: user
      }))
      ws.onmessage = (m) => {
        const { message, errors, accessToken } = JSON.parse(m.data)
        console.log(message)
        if(message === 'error'){
          return setError(errors[0])
        }
        context.setToken(accessToken)
        history.push('/')
      }
    } 
  }

  return (
    <div className="register-page">
      <div className="register-block">
        <div
        style={{ 
          backgroundColor: error.length 
          ? 'rgb(139, 75, 75)'
          : 'rgb(123, 154, 212)'
        }}
        className="auth-header">
          <div className="auth-title">
            <p>SignUp</p>
          </div>
          <div
            onClick={goToUri}
            className="auth-redirect"
          >
            <p>Login</p>
          </div>
        </div>
        <form
        className="auth-form"
        >
          <div className="form-block">
            <label htmlFor="name-input">
              <span className="auth-input-title">name</span>
              <input
                onChange={changeHandler}
                value={user.name}
                type="text"
                className="auth-input"
                id="name-input"
                name="name"
                />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="email-input">
              <span className="auth-input-title">email</span>
              <input
                onChange={changeHandler}
                value={user.email}
                type="text"
                className="auth-input"
                id="email-input"
                name="email"
                />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="password-input">
              <span className="auth-input-title">paswd</span>
              <input
                onChange={changeHandler}
                value={user.password}
                type="password"
                className="auth-input"
                id="password-input"
                name="password"
                />
            </label>
          </div>
          <div className="btn-submit-block">
            <button
              type="submit"
              onClick={submitHandler}
              className="btn-submit-auth"
              style={{ 
                backgroundColor: error.length 
                ? 'rgb(139, 75, 75)'
                : 'rgb(123, 154, 212)'
              }}
              >
                { error.length ? 'Error' :'Submit' }
              </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { Register }
