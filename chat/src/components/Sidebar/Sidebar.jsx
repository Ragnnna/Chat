import React from 'react'
import '../components.css'
import { Search } from '../Search/Search'
import { SidebarItem } from './SidebarItem'

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="search-wrapper">
        <Search />
      </div>
      <SidebarItem />
    </div>
  )
}

export { Sidebar }