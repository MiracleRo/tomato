import { ADD_TODO, INIT_TODO } from '../actionType'

export default (state = [], action: any) => {
  console.log(1111111111)
  switch (action.type) {
    case ADD_TODO:
      return [...state, Object.assign(action.payload, {editing: false})]
    case INIT_TODO:
      return [...action.payload.map((item: any) => Object.assign(item, {editing: false}))]
    default:
      return state
  }
}

// export default todos