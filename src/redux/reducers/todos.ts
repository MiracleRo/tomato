import { ADD_TODO } from '../actionType'

const todos = (state = [], action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, ...action.payload]
    default:
      return state
  }
}

export default todos