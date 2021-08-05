import React, { useContext } from 'react'
import { UserContext } from '../../App'
import '../components.css'

const SettingsModal = () => {
  const context = useContext(UserContext)

  return (
    <div
    className="settings-block">
      <ul className="settings-list">
        <li className="settings-list-item">Settings</li>
        <li
          onClick={context.removeToken}
          className="settings-list-item"
        >
          LogOut
        </li>
      </ul>
    </div>
  )
}

export { SettingsModal }
