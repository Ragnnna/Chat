import React from 'react'
import './App.css';
import { Auth } from './components/Auth/Auth';
import { Main } from './components/Main/Main';

export const UserContext = React.createContext({})

const App = () => {
  const setToken = (token) => localStorage.setItem('token', token)
  const setUID = (id) => localStorage.setItem('UID', id)
  const removeUID = (id) => localStorage.removeItem('UID')
  const removeToken = () => localStorage.removeItem('token')
  const UID = localStorage.getItem('UID')
  const token = localStorage.getItem('token')

  return (
    <UserContext.Provider
      value={{
        UID,
        setUID,
        removeUID,
        setToken,
        removeToken,
        token
      }}
    >
      <div className="App">
        { token ? 
        <Main /> :
        <Auth />
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
