import React from 'react'
import './App.css';
import { Auth } from './components/Auth/Auth';
import { Main } from './components/Main/Main';

export const UserContext = React.createContext({})

const App = () => {
  const setToken = (token) => localStorage.setItem('token', token)
  const removeToken = () => localStorage.removeItem('token')
  const token = localStorage.getItem('token')

  return (
    <UserContext.Provider
      value={{
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
