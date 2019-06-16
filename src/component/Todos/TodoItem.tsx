import React, { Component } from 'react'

class TodoItem extends Component<any, {}> {
  constructor(props:any) {
    super(props)
  }

  render() {
    return (
      <div className="item-wrapper">
        { this.props.info.description }
      </div>
    )
  }
}

export default TodoItem