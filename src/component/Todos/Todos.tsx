import React, { Component } from 'react'
import TodoInput from './TodoInput'
import axios from '../../config/axios'

import './Todos.scss'

class Todos extends Component {
  constructor(props:any) {
    super(props)
  }

  addTodo = async (params: any) => {
    try {
      await axios.post('todos', params)
    } catch (e) {
      throw new Error(e)
    }
    
  }

  getToDos = async () => {
    await axios.get
  }

  render() {
    return (
      <div className="todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
      </div>
    )
  }
}

export default Todos