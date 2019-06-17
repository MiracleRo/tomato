import React, { Component } from 'react';
import { Checkbox, Icon} from 'antd';
import classNames from 'classnames';
import './TodoItem.scss';

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

  onKeyUp = (e:any)=>{
		if(e.keyCode === 13 && this.state.description !== ''){
			this.props.updateTodo(this.props.id, {description: this.state.description})
		}
	}

  render() {
    const todoClass = classNames({
      itemWrapper: true,
      editing: this.props.editing,
      completed: this.props.completed
    })
    const editing = (
      <div className="editing">
        <input type="text" value={this.state.description}
				       onChange={e => this.setState({description: e.target.value})}
				       onKeyUp={this.onKeyUp}/>
        <div className="iconWrapper">
          <Icon type="enter" />
          <Icon type="delete" onClick={(e: any) => this.props.updateTodo(info.id, {deleted: true})}/>
        </div>
      </div>
    )
    const text = <span className="text" onDoubleClick={(e:any) => this.props.edit(this.props.id)}>{ this.state.description }</span> 
    const info = this.props
    return (
      <div className={todoClass}>
        <Checkbox checked={info.completed} onChange={(e: any) => this.props.updateTodo(info.id, {completed: e.target.checked})} />
        {this.props.editing ? editing : text} 
      </div>
    )
  }
}

export default TodoItem