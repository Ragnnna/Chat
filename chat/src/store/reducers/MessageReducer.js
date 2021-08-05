import { SET_MESSAGES } from "../constants"

const initialState = {
  messages: []
}

const messageReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_MESSAGES:
      return { ...state, messages: [ action.payload, ...state.messages ] }
    default:
      return state
  }
}

export { messageReducer }