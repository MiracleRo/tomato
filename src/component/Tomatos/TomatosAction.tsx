import React, { Component } from 'react';
import { Button } from "antd"
import axios from 'src/config/axios'

class TomatosAction extends Component<{}> {
  constructor (prop: any) {
    super(prop)
  }

  async startAction () {
    const res = await axios.post('tomatoes', {durtion: 1500000})
    console.log(res)
  }

  render() {
    return (
      <div className="tomatoAction">
        <Button onClick={this.startAction}>开始番茄</Button>
      </div>
    );
  }
}

export default TomatosAction