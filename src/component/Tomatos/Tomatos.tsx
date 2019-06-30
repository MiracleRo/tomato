import React, { Component } from 'react';
import './Tomato.scss'
import TomatosAction from './TomatosAction'
import axios from '../../config/axios'
import { connect } from 'react-redux'
import { initTomatoes, addTomatoes, updateTomatoes } from '../../redux/action/tomatoes'

interface ITOMATOES {
  addTomatoes: (payload: any) => void
  initTomatoes: (payload: any) => void
  updateTomatoes: (payload: any) => void
  tomatoes: any[]
}

class Tomatos extends Component<ITOMATOES, any> {

  componentWillMount () {
    this.init()
  }

  get unfinishedTomato () {
    return this.props.tomatoes.filter(item => !item.description && !item.ended_at && !item.aborted)[0]
  }

  startAction = async () => {
    const res = await axios.post('tomatoes', {durtion: 1500000})
    this.props.addTomatoes(res.data.resource)
  }

  init = async () => {
    const res = await axios.get('tomatoes')
    this.props.initTomatoes(res.data.resources)
  }

  render() {
    return (
      <div className="tomato">
        <TomatosAction updateTomatoes={this.props.updateTomatoes} unfinishedTomato={this.unfinishedTomato} startAction={this.startAction} />
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
  addTomatoes,
  updateTomatoes 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatos)