import { ADD_TOMATOES, INIT_TOMATOES } from '../actionType'

export const addTomatoes = (payload: any) => ({ type: ADD_TOMATOES, payload })

export const initTomatoes = (payload: any[]) => ({ type: INIT_TOMATOES, payload })
