import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from '../../App'
import { useCustomConnection } from '../../hooks/useCustomConnection'
import { setUsersAC } from '../../store/actions/ActionCreators'
import '../components.css'
import { SearchUserItem } from './SearchUserItem'

const Search = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  const context = useContext(UserContext)
  const [inputValue, setInputValue] = useState('')

  const { connection } = useCustomConnection('ws://localhost:8200', context.token)

  const changeHandler = e => {
    const value = e.target.value
    setInputValue(value)
  }

  const submitHandler = (e) => {
    if(!inputValue || e.key !== 'Enter'){
      return
    }
    connection.send(JSON.stringify({
      type: 'FETCH_USERS',
      data: inputValue.trim()
    }))
    connection.onmessage = (m) => {
      const data = JSON.parse(m.data)
      dispatch(setUsersAC(data.users))
    } 
  }

  const mappedUsers = users.map(el => 
    <SearchUserItem
      key={el._id}
      id={el._id}
      name={el.name}
      setInputValue={setInputValue}
    />
  )

  return (
    <div className="sidebar-search-block">
      <div className="search-input-wrapper">
        <input
          onChange={changeHandler}
          onKeyPress={submitHandler}
          value={inputValue}
          className="search-input"
          name="search"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="search-user-list">
        { users.length ? mappedUsers : <></> }
      </div>
    </div>
  )
}

export { Search }
