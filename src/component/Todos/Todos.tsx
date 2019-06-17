import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import axios from '../../config/axios'


import './Todos.scss'

class Todos extends Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      todos: []
    }
  }

  async componentWillMount () {
    const res = await axios.get('todos')
    const list =  res.data.resources.map((item: any) => Object.assign(item, {editing: false}))
    this.setState({
      todos: list
    })
  }

  addTodo = async (params: any) => {
    try {
      await axios.post('todos', params)
    } catch (e) {
      throw new Error(e)
    }
    
  }

  updateTodo = async (id: number, params: boolean) => {
    const res = await axios.put(`todos/${id}`, params)
    const resId = res.data.id
    let newTodo = this.state.todos.map((item: any) => {
      if (item.id === resId) {
        return res.data.resource
      } else {
        return item
      }
    })
    newTodo = newTodo.map((item: any) => Object.assign(item, {editing: false}))
    this.setState({todos: newTodo})
  }

  edit = (id: number) => {
    const {todos} = this.state
    const list = todos.map((item: any) => {
      if (item.id === id) {
        return Object.assign(item, {editing: true})
      } else {
        return Object.assign(item, {editing: false})
      }
    })
    this.setState({
      todos: list
    })
  }

  render() {
    const items =  this.state.todos.map((item:any) =>
      <TodoItem key={item.id} {...item} updateTodo={this.updateTodo} edit={this.edit} />
    )

    return (
      <div className="todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
        {items}
      </div>
    )
  }
}

export default Todos