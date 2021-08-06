import React, { useState } from 'react'
import '../components.css'
import SettingsIcon from '@material-ui/icons/Settings';
import { SettingsModal } from './SettingsModal';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory()
  const [settings, setSettings] = useState(false)

  const goToMainPage = () => history.push('/')
  const handleOpenSettings = () => {
    setSettings(!settings)
  }

  window.onclick = (e) => {
    const { className } = e.explicitOriginalTarget
    if(className === "settings-header" || className === "settings-block"){
      return
    }
    setSettings(false)
  }

  return (
    <div className="main-header">
      <div className="title-header-block">
        <p
        onClick={goToMainPage}
        className="title-header">Messaging</p>
      </div>
      <div className="settings-header-block">
        <p 
          className="settings-header"
          onClick={handleOpenSettings}
        >
          <SettingsIcon
            style={{ 
              transform: settings && 'rotate(30deg)',
              color: settings && "rgb(221, 221, 221)"
            }}
            className="icon-settings"
          />
          Settings
        </p>
        {
          settings 
          && <SettingsModal toggle={settings}/>
        }
      </div>
    </div>
  )
}

export { Header }
