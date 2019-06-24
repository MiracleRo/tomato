import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import axios from '../../config/axios'
import { connect } from 'react-redux'
import { initTodo } from '../../redux/action'

import './Todos.scss'

class Todos extends Component<any, any> {
  constructor(props:any) {
    super(props)
  }

  async componentWillMount () {
    const res = await axios.get('todos')
    this.props.initTodo(res.data.resources)
  }

  updateTodo = async (id: number, params: boolean) => {
    const res = await axios.put(`todos/${id}`, params)
    const resId = res.data.resource.id
    const newTodo = this.props.todos.map((item: any) => item.id === resId ? 
    Object.assign(res.data.resource, {editing: false}) : Object.assign(item, {editing: false}))
    this.setState({todos: newTodo})
  }

  edit = (id: number) => {
    const {todos} = this.props
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
        <TodoInput/>
         {   this.props.unCompletedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} updateTodo={this.updateTodo} edit={this.edit} />)
         }
         {   this.props.completedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} updateTodo={this.updateTodo} edit={this.edit} />)
         }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  completedTodos: state.todos.filter((item: any) => item.completed),
  unCompletedTodos: state.todos.filter((item: any) => !item.completed),
	...ownProps
})

const mapDispatchToProps = {
  initTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)