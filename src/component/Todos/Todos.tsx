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
      const res = await axios.post('todos', params)
      let list = [res.data.resource, ...this.state.todos]
      list = list.map((item: any) => Object.assign(item, {editing: false}))
      this.setState({
        todos: list
      }) 
    } catch (e) {
      throw new Error(e)
    }
    
  }

  updateTodo = async (id: number, params: boolean) => {
    const res = await axios.put(`todos/${id}`, params)
    const resId = res.data.resource.id
    const newTodo = this.state.todos.map((item: any) => item.id === resId ? 
    Object.assign(res.data.resource, {editing: false}) : Object.assign(item, {editing: false}))
    this.setState({todos: newTodo})
  }

  get unDeletedTodos () {
    return this.state.todos.filter((item: any) => !item.deleted)
  }

  get unCompletedTodos () {
    return this.unDeletedTodos.filter((item: any) => !item.completed) 
  }

  get completedTodos () {
    return this.unDeletedTodos.filter((item: any) => item.completed) 
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

    return (
      <div className="todos">
        <TodoInput addTodo={(params: any) => this.addTodo(params)}/>
         {   this.unCompletedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} updateTodo={this.updateTodo} edit={this.edit} />)
         }
         {   this.completedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} updateTodo={this.updateTodo} edit={this.edit} />)
         }
      </div>
    )
  }
}

export default Todos