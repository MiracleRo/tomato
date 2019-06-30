import React, { Component } from 'react';
import { Button } from "antd"

interface ITomatoActionProps {
  unfinishedTomato: any,
  startAction: () => void
}

class TomatosAction extends Component<ITomatoActionProps> {
  constructor (prop: any) {
    super(prop)
  }

  render() {
    return (
      <div className="tomatoAction">
        <Button onClick={(e:any) => {this.props.startAction()}}>开始番茄</Button>
      </div>
    );
  }
}

export default TomatosAction