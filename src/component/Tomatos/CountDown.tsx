import React, { Component } from 'react';

interface ICountDown {
  countdown: number
  onFinish: () => void
}

interface ICountDownState {
  timer: number
}

let counter:any

class CountDown extends Component<ICountDown, ICountDownState> {
  constructor (props: any) {
    super(props)
    this.state = {
      timer: this.props.countdown
    }
  }

  get countDown(){
		const min = Math.floor(this.state.timer/1000/60)
		const second = Math.floor(this.state.timer/1000%60)
		return `${min<10?`0${min}`:min}:${second<10?`0${second}`:second}`
	}


  componentDidMount () {
    counter = setInterval(()=>{
      const time = this.state.timer
	    this.setState({timer: time - 1000})
		  document.title = `${this.countDown} - 番茄APP`;
	    if(time < 1000){
		  	document.title = '番茄APP';
		    this.props.onFinish()
			  clearInterval(counter)
      }
    },1000)
  }

  componentWillUnmount () {
    clearInterval(counter)
  }

  render() {
    return (
      <div>{this.countDown}</div>
    )
  }
}

export default CountDown