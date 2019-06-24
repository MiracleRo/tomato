import { ADD_TODO } from './actionType'

export function addTodo(todo: any[]) {
  return { type: ADD_TODO, todo }
}