import { SET_USERS } from "../constants"

export const setUsersAC = (data) => {
  return { type: SET_USERS, payload: data  }
}