import React, { Component } from 'react';
import { Button, Input, Icon } from "antd"
import CountDown from './CountDown'
import axios from '../../config/axios'

import './TomatoAction.scss'

interface ITomatoActionProps {
  unfinishedTomato: any,
  startAction: () => void,
  updateTomatoes: (payload: any) => void
}

interface IActionState {
  description: string
}

class TomatosAction extends Component<ITomatoActionProps, IActionState> {
  constructor (prop: any) {
    super(prop)
    this.state = {
      description: ''
    }
  }

  putDescription = async (description: string) => {
    const res = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`, {
      description,
      ended_at: new Date()
    })
    this.setState({description: ''})
    this.props.updateTomatoes(res.data.resource)
  }
  render() {
    let html = <div />
    
    if (!this.props.unfinishedTomato) {
      html = <Button className="startTomatoButton" onClick={(e:any) => {this.props.startAction()}}>开始番茄</Button>
    } else {
      const startAt = Date.parse(this.props.unfinishedTomato.started_at)
      const duration = this.props.unfinishedTomato.duration * 1000
      const now = new Date().getTime()

      if (now - startAt > duration) {
        html = (<div className="inputWrapper">
            <Input onChange={(e:any) => this.setState({description: e.target.value})}
              onPressEnter={(e:any) => this.putDescription(e.target.value)}
              placeholder="你刚刚完成了什么任务?"/>
            <Icon type="close-circle" className="abort" />
          </div>)
      } else if (now - startAt < duration) {
        const timer = startAt + duration - now
        html = (
          <div className="countDownWrapper">
						<CountDown countdown={timer} />
          </div>
          )
      }
    }

    return (
      <div className="TomatoAction">
        { html }
      </div>
    );
  }
}

export default TomatosAction