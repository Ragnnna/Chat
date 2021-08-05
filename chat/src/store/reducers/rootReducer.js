import { combineReducers } from "redux";
import { messageReducer } from "./MessageReducer";

const rootReducer = combineReducers({
  messages: messageReducer
})

export { rootReducer }