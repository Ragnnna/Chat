import React from 'react'
import { Chat } from '../Chat/Chat'
import '../components.css'
import { Header } from '../Header/Header'
import { Sidebar } from '../Sidebar/Sidebar'

const Main = () => {
  
  return (
    <div className="main-content">
      <Header />
      <div className="content-bar">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export { Main }
