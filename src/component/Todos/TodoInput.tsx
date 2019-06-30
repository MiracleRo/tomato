import React, { Component } from 'react'
import { Input, Icon } from 'antd';
import { connect } from 'react-redux'
import { addTodo } from '../../redux/action/todos'
import axios from '../../config/axios'

interface IState {
  description: string
}

// interface ITodoInputProps {
// 	addTodo: (payload:any) => any;
// }

class Todos extends Component<any, IState> {
  constructor(props:any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  postTodo = async () => {
    if (this.state.description !== '') {
      try {
        const res = await axios.post('todos', {description: this.state.description})
        this.props.addTodo(res.data.resource)
        this.setState({description: ''})
      } catch(e) {
        throw new Error(e)
      }
    }
  }

  render() {
    const { description } = this.state
    const suffix = description ? <Icon type="enter" onClick={this.postTodo} /> : <span />

    return (
      <div className="input-wrapper">
        <Input
          value={description}
          onChange={(e) => this.setState({description: e.target.value})}
          placeholder="请输入待办项"
          onPressEnter={this.postTodo}
          suffix={suffix}
         />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...ownProps
})


const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)