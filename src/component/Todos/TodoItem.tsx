import React, { Component } from 'react';
import { Checkbox, Icon, Input } from 'antd';


interface IItemProps {
  updateTodo: (id: number, params: any) => void
  edit: (id:number) => void
  completed: boolean
  description: string
  id: number
  editing: boolean
}

interface IState {
  description: string
}

class TodoItem extends Component<IItemProps, IState> {
  constructor(props:any) {
    super(props)
    this.state = {
      description: ''
    }
  }
  
  componentWillMount () {
    this.setState({
      description: this.props.description
    })
  }

  edit (value: string) {
    console.log(value)
  }
  render() {
    const info = this.props
    const content = this.props.editing ? 
    <Input onChange={(e:any) => this.setState({description: e.target.value})}
    value={ this.state.description }
    onPressEnter={(e:any) => this.props.updateTodo(info.id,{description:e.target.value})}
    /> : 
    <span onDoubleClick={(e:any) => this.props.edit(this.props.id)}>{ this.state.description }</span>
    return (
      <div className="item-wrapper">
        <Checkbox checked={info.completed} onChange={(e: any) => this.props.updateTodo(info.id, {completed: e.target.checked})} />
        {content} 
        <Icon type="enter" />
        <Icon type="delete" onClick={(e: any) => this.props.updateTodo(info.id, {deleted: true})}/>
      </div>
    )
  }
}

export default TodoItem