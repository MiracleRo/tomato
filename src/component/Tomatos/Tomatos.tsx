import React, { Component } from 'react';
import './Tomato.scss'
import TomatosAction from './TomatosAction'

class Tomatos extends Component<{}> {
  render() {
    return (
      <div className="tomato">
        <TomatosAction />
      </div>
    );
  }
}

export default Tomatos