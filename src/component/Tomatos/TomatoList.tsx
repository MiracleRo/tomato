import React, { Component } from 'react';
import {format} from 'date-fns'
import './TomatoList.scss'

interface ITomatoProps {
  finishedTomato: any
}

const TomatoItem = (props: any) => {
	return (
		<div className="TomatoItem">
			<span className="timeRange">{format(props.started_at,'H:mm')} - {format(props.ended_at,'H:mm')}</span>
			<span className="description">{props.description}</span>
		</div>
	)
}

class TomatoList extends Component<ITomatoProps> {
  constructor(props: any) {
    super(props)
  }

  get dates(){
		const dates = Object.keys(this.props.finishedTomato)
		return dates.sort((a,b) => Date.parse(b) - Date.parse(a)).splice(0,3)
	}

  render() {
    const list = this.dates.map((d: string) => {
      const tomatoes = this.props.finishedTomato[d]
      return (
        <div key={d} className="dailyTomatoes">
					<div className="title">
						<span className="dateTime">{format(d,'M月DD日')}</span>
						<span className="finishedCount">完成了{tomatoes.length}个番茄</span>
					</div>
					{
						tomatoes.map((t: any) => <TomatoItem key={t.id} {...t}/>)
					}
				</div>
      )
    })

    return (
			<div className="TomatoList">
				{list}
			</div>
		)
  }
}

export default TomatoList