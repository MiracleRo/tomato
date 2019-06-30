import { ADD_TODO, INIT_TODO, UPDATE_TODO, EDIT_TODO } from '../actionType'

export const addTodo = (payload: any) => ({ type: ADD_TODO, payload })

export const initTodo = (payload: any[]) => ({ type: INIT_TODO, payload })

export const updateTodo = (payload: any) => ({ type: UPDATE_TODO, payload })

export const editTodo = (payload: number) => ({ type: EDIT_TODO, payload })