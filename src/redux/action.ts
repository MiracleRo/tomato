import { ADD_TODO, INIT_TODO } from './actionType'

export const addTodo = (payload: any) => ({ type: ADD_TODO, payload })

export const initTodo = (payload: any[]) => ({ type: INIT_TODO, payload })