import { combineReducers } from "redux";
import { messageReducer } from "./MessageReducer";
import { usersReducer } from "./UsersReducer";

const rootReducer = combineReducers({
  messages: messageReducer,
  users: usersReducer
})

export { rootReducer }