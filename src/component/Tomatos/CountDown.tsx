import React, { Component } from 'react';

interface ICountDown {
  countdown: number
}

interface ICountDownState {
  timer: number
}

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
    const counter = setInterval(() => {
      if (this.state.timer < 0) {
        clearInterval(counter)
      }
      this.setState({
        timer: this.state.timer - 1000
      })
    }, 1000)
  }

  render() {
    return (
      <div>{this.countDown}</div>
    )
  }
}

export default CountDown