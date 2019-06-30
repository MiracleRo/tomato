import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'

import './Todos.scss'

class Todos extends Component<any, any> {
  constructor(props:any) {
    super(props)
  }

  render() {
    return (
      <div className="todos">
        <TodoInput/>
         {   this.props.unCompletedTodos.map((item:any) =>
             <TodoItem key={item.id} {...item} />)
         }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  unCompletedTodos: state.todos.filter((item: any) => !item.completed && !item.deleted),
	...ownProps
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)