import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Register } from './Register'
import '../components.css'
import { Login } from './Login'

const Auth = () => {

  return (
    <div className="auth-view">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login />}
        />
        <Route
          exact
          path="/create"
          render={() => <Register />}
        />
        <Redirect
          from="*"
          to="/"
        />
      </Switch>
    </div>
  )
}

export { Auth }
 