import { SET_USERS } from "../constants"

const initialState = {
  users: []
}

const usersReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

export { usersReducer }
