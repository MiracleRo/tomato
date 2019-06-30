import React, { Component } from 'react';
import { Checkbox, Icon} from 'antd';
import classNames from 'classnames';
import './TodoItem.scss';
import { connect } from 'react-redux'
import { updateTodo, editTodo } from '../../redux/action/todos'
import axios from '../../config/axios'

interface IItemProps {
  updateTodo: (params: any) => void
  editTodo: (id:number) => void
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

  edit () {
    this.props.editTodo(this.props.id)
  }

  onKeyUp = (e:any)=>{
		if(e.keyCode === 13 && this.state.description !== ''){
			this.update({description: this.state.description})
		}
	}

  async update (params: any) {
    if (params.completed) {
      params.completed_at = new Date()
    }
    const res = await axios.put(`todos/${this.props.id}`, params)
    this.props.updateTodo(res.data.resource) 
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
          <Icon type="delete" onClick={(e: any) => this.update({deleted: true})}/>
        </div>
      </div>
    )
    const text = <span className="text" onDoubleClick={(e:any) => this.edit()}>{ this.state.description }</span> 
    const info = this.props
    return (
      <div className={todoClass}>
        <Checkbox checked={info.completed} onChange={(e: any) => this.update({completed: e.target.checked})} />
        {this.props.editing ? editing : text} 
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...ownProps
})

const mapDispatchToProps = {
  editTodo,
  updateTodo 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem)