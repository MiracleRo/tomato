import React, { Component } from 'react';
import { Button } from 'antd';

interface IRouter {
  history: any;
}
class Index extends Component<IRouter> {
  constructor (props: any) {
    super(props)
  }

  goToLogin = () =>  {
    this.props.history.push('login')
  }

  goToSign = () => {
    console.log(2)
  }

  render() {
    return (
      <div>
        <Button onClick={this.goToLogin}>注册</Button>
        <Button onClick={this.goToSign}>登录</Button>
      </div>
    );
  }
}

export default Index;