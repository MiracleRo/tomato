import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import axios from '../../config/axios'


import './Todos.scss'

class Todos extends Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      resources: [] 
    }
  }

  async componentWillMount () {
    const res = await axios.get('todos')
    this.setState({
      resources: res.data.resources
    })
  }

  addTodo = async (params: any) => {
    try {
      await axios.post('todos', params)
    } catch (e) {
      throw new Error(e)
    }
    
  }

  render() {
    const items =  this.state.resources.map((item:any) =>
      <TodoItem key={item.id} info={item} />
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