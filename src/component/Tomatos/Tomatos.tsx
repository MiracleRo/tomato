import React, { Component } from 'react';
import './Tomato.scss'
import TomatosAction from './TomatosAction'
import TomatoList from './TomatoList'
import axios from '../../config/axios'
import { connect } from 'react-redux'
import { addTomatoes, updateTomatoes } from '../../redux/action/tomatoes'
import _ from 'lodash'
import {format} from 'date-fns'

interface ITOMATOES {
  addTomatoes: (payload: any) => void
  initTomatoes: (payload: any) => void
  updateTomatoes: (payload: any) => void
  tomatoes: any[]
}

class Tomatos extends Component<ITOMATOES, any> {

  get unfinishedTomato () {
    return this.props.tomatoes.filter(item => !item.description && !item.ended_at && !item.aborted)[0]
  }
  
  get finishedTomato () {
    const list =  this.props.tomatoes.filter(item => item.description && item.ended_at && !item.aborted)
    return _.groupBy(list, (item:any) => {
      return format(item.started_at,'YYYY-MM-D')
    })
  }

  startAction = async () => {
    const res = await axios.post('tomatoes', {durtion: 1500000})
    this.props.addTomatoes(res.data.resource)
  }

  render() {
    return (
      <div className="tomato">
        <TomatosAction updateTomatoes={this.props.updateTomatoes} unfinishedTomato={this.unfinishedTomato} startAction={this.startAction} />
        <TomatoList finishedTomato={this.finishedTomato} />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
	...ownProps
})


const mapDispatchToProps = {
  addTomatoes,
  updateTomatoes 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatos)