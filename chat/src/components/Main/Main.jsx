import React from 'react'
import { Chat } from '../Chat/Chat'
import '../components.css'
import { Header } from '../Header/Header'
import { Sidebar } from '../Sidebar/Sidebar'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Empty } from '../Empty'

const Main = () => {
  
  return (
    <div className="main-content">
      <Header />
      <div className="content-bar">
        <Sidebar />
        <Switch>
          <Route exact path="/" render={() => <Empty />}/>
          <Route exact path="/chat/:id" render={() => <Chat />}/>
          <Redirect from="*" to="/"/>
        </Switch>
      </div>
    </div>
  )
}

export { Main }
