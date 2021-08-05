import React from 'react'
import { useCustomRedirect } from '../../hooks/useCustomRedirect'
import '../components.css'

const Login = () => {
  
  const { goToUri } = useCustomRedirect('create')

  return (
    <div className="register-page">
      <div className="register-block">
        <div className="auth-header">
          <div className="auth-title">
            <p>SignIn</p>
          </div>
          <div
            onClick={goToUri}
            className="auth-redirect"
          >
            <p>Create</p>
          </div>
        </div>
        <form className="auth-form">
          <div className="form-block">
            <label htmlFor="email-input">
              <span className="auth-input-title">email</span>
              <input
                type="text"
                className="auth-input"
                id="email-input"
                />
            </label>
          </div>
          <div className="form-block">
            <label htmlFor="password-input">
              <span className="auth-input-title">paswd</span>
              <input
                type="password"
                className="auth-input"
                id="password-input"
                />
            </label>
          </div>
          <div className="btn-submit-block">
            <button
              className="btn-submit-auth"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { Login }