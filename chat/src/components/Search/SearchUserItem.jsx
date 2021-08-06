import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUsersAC } from '../../store/actions/ActionCreators'
import '../components.css'

const SearchUserItem = (props) => {
  const dispatch = useDispatch()
  const { id, name, setInputValue } = props
  const history = useHistory()

  const redirectTo = () => {
    dispatch(setUsersAC([]))
    setInputValue('')
    history.push(`/chat/${id}`)
  }

  return (
    <div
      onClick={redirectTo}
      className="search-user-item"
    >
      <p>{ name }</p>
    </div>
  )
}

export { SearchUserItem }
