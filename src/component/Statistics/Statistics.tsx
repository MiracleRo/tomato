import React, { Component } from 'react'
import { connect } from 'react-redux'
import Polygon from './Polygon'
import {format} from "date-fns";
import _ from 'lodash'
import './Statistics.scss'

interface IStatProps {
  todos: any[]
}

class Statistics extends Component<IStatProps> {
  get finishedTodos () {
    return this.props.todos.filter(t => t.completed && !t.deleted)
  }

  get dailyTodos(){
		return  _.groupBy(this.finishedTodos,(todo)=>{
			return format(todo.updated_at,'YYYY-MM-D')
		})
	}

  render() {
    return (
      <div className="Statistics" id="Statistics">
				<ul>
					<li>统计</li>
					<li>目标</li>
					<li>番茄历史</li>
					<li>
						任务历史
						累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length} />
					</li>
				</ul>
			</div>
    )
  }
}


const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todos,
	...ownProps
})

export default connect(mapStateToProps)(Statistics)