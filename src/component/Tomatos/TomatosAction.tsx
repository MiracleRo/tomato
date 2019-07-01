import React, { Component } from 'react';
import { Button, Input, Icon, Modal } from "antd"
import CountDown from './CountDown'
import axios from '../../config/axios'

import './TomatoAction.scss'

const confirm = Modal.confirm;

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


  updateTomato = async (params:any)=>{
		try {
			const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
			this.props.updateTomatoes(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
  }
  
  onFinish = () => {
    this.forceUpdate()
  }
   
  showConfirm = () => {
    confirm({
			title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
			onOk: ()=>{
				this.abortTomato()
			},
			onCancel() {
				console.log('取消')
			},
			cancelText: '取消',
			okText: '确定',
		})
  }

  abortTomato = () => {
    this.updateTomato({aborted: true})
		document.title = '番茄APP'
  } 

  putDescription = (description: string) => {
    this.updateTomato( {
      description,
      ended_at: new Date()
    })
    this.setState({description: ''})
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
            <Icon type="close-circle" className="abort" onClick={this.showConfirm} />
          </div>)
      } else if (now - startAt < duration) {
        const timer = startAt + duration - now
        html = (
          <div className="countDownWrapper">
						<CountDown onFinish={this.onFinish} duration={this.props.unfinishedTomato.duration * 1000} countdown={timer} />
            <Icon type="close-circle" className="abort"
						      onClick={this.showConfirm}/>
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