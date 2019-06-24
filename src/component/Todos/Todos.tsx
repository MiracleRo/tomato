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

  render() {

    return (
      <div className="todos">
        <TodoInput/>
         {   this.props.unCompletedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} />)
         }
         {   this.props.completedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} />)
         }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  completedTodos: state.todos.filter((item: any) => item.completed && !item.deleted),
  unCompletedTodos: state.todos.filter((item: any) => !item.completed && !item.deleted),
	...ownProps
})

const mapDispatchToProps = {
  initTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)