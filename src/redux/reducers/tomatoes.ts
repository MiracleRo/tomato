import { ADD_TOMATOES, INIT_TOMATOES, UPDATE_TOMATOES } from '../actionType'

export default (state = [], action: any) => {
  switch (action.type) {
    case ADD_TOMATOES:
      return [action.payload, ...state]
    case INIT_TOMATOES:
      return [...action.payload]
    case UPDATE_TOMATOES:
      return state.map((item:any) => item.id === action.payload.id ? action.payload : item)
    default:
      return state
  }
}
