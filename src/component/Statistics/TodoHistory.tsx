import React, { Component } from 'react'
import { connect } from 'react-redux'
import {format} from "date-fns";
import _ from 'lodash'

interface ITodoHistoryProps {
	todos: any[];
}

class TodoHistory extends Component<ITodoHistoryProps> {
  constructor(props:any) {
    super(props)
  }

  get finishedTodos(){
		return this.props.todos.filter(t => t.completed && !t.deleted)
	}

	get deletedTodos(){
		return this.props.todos.filter(t => t.deleted)
	}

  get dailyFinishedTodos(){
		return _.groupBy(this.finishedTodos,(todo)=>{
			return format(todo.updated_at,'YYYY-MM-DD')
		})
	}


	get finishedDates(){
		return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
	}

  render () {
    // const TodoHistoryTodoItem = (
    //   <div>

    //   </div>
    // )
    const finishedTodoList = this.finishedDates.map(date=>{
			return (
				<div key={date} className="dailyTodos">
					<div className="summary">
						<p className="date">
							<span>{date}</span>
							<span>周五</span>
						</p>
						<p className="finishedCount">完成了{this.dailyFinishedTodos[date].length}个任务</p>
					</div>
					{/* <div className="todoList">
						{
							this.dailyFinishedTodos[date].map(todo =>
								<TodoHistoryTodoItem key={todo.id} todo={todo} itemType="finished"/>)
						}
					</div> */}
				</div>
			)
		})
    return (
      <div>
        {finishedTodoList}
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos, 
	...ownProps
})

export default connect(
  mapStateToProps
)(TodoHistory)