import { ADD_TODO, INIT_TODO, UPDATE_TODO, EDIT_TODO } from '../actionType'

export default (state = [], action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state]
    case INIT_TODO:
      return [...action.payload.filter((item: any) => !item.deleted )]
    case UPDATE_TODO:
      return state.map((item: any) => {
        if (item.id === action.payload.id) {
          return action.payload
        } else {
          return DataTransferItem
        }
      })
    case EDIT_TODO:
      state.forEach((item: any) => {
        if (item.id === action.payload) {
          item.editing = false
        } else {
          item.editing = true
        }
      })
    default:
      return state
  }
}

// export default todos