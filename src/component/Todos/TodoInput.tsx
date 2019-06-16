import React, { Component } from 'react'
import { Input, Icon } from 'antd';

interface IState {
  description: string
}

interface ITodoProps {
  addTodo: (params: any) => void
}

class Todos extends Component<ITodoProps, IState> {
  constructor(props:any) {
    super(props)
    this.state = {
      description: ''
    }
  }

  updateTodo = async () => {
    if (this.state.description !== '') {
      this.props.addTodo({description: this.state.description})
      this.setState({description: ''})
    }
  }

  render() {
    const { description } = this.state
    const suffix = description ? <Icon type="enter" onClick={this.updateTodo} /> : <span />

    return (
      <div className="input-wrapper">
        <Input
          value={description}
          onChange={(e) => this.setState({description: e.target.value})}
          placeholder="请输入待办项"
          onPressEnter={this.updateTodo}
          suffix={suffix}
         />
      </div>
    )
  }
}

export default Todos