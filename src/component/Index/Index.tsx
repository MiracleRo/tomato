import React, { Component } from 'react';
import { Button } from 'antd';
import axios from '../../config/axios'

interface IRouter {
  history: any;
}

interface IUser {
  user: any
}
class Index extends Component<IRouter, IUser> {
  constructor (props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }

  async componentWillMount () {
    const res = await axios.get('/me')
    this.setState({user: res.data})
  }

  logOut = () =>  {
    localStorage.setItem('x-token', '')
    this.props.history.push('login')
  }

  render() {
    return (
      <div>
        <p>hello {this.state.user.account}</p>
        <Button onClick={this.logOut}>注销</Button>
      </div>
    );
  }
}

export default Index;