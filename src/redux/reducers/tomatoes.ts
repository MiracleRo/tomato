import { ADD_TOMATOES, INIT_TOMATOES } from '../actionType'

export default (state = [], action: any) => {
  switch (action.type) {
    case ADD_TOMATOES:
      return [action.payload, ...state]
    case INIT_TOMATOES:
      return [...action.payload]
    default:
      return state
  }
}
