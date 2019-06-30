import React, { Component } from 'react';
import './Tomato.scss'
import TomatosAction from './TomatosAction'
import axios from '../../config/axios'
import { connect } from 'react-redux'
import { initTomatoes, addTomatoes } from '../../redux/action/tomatoes'

interface ITOMATOES {
  addTomatoes: (payload: any) => void
  initTomatoes: (payload: any) => void
  tomatoes: any[]
}

class Tomatos extends Component<ITOMATOES, any> {

  componentWillMount () {
    this.init()
  }

  get unfinishedTomato () {
    return this.props.tomatoes.filter(item => !item.description && !item.ended_at)[0]
  }

  startAction = async () => {
    const res = await axios.post('tomatoes', {durtion: 1500000})
    this.props.addTomatoes(res.data.resource)
    console.log(this.props.tomatoes)
  }

  init = async () => {
    const res = await axios.get('tomatoes')
    this.props.initTomatoes(res.data.resources)
  }

  render() {
    return (
      <div className="tomato">
        <TomatosAction unfinishedTomato={this.unfinishedTomato} startAction={this.startAction} />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
	...ownProps
})


const mapDispatchToProps = {
  initTomatoes,
  addTomatoes 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatos)