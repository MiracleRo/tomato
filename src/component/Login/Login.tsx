import React, { Component } from 'react';
import { Input, Button, Icon, message } from 'antd';
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import './Login.scss'

interface ILogin {
  account: string,
  password: string
}

class Login extends Component<any, ILogin> {
  constructor (props:any) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
  }


  onChange = (value:string, key: keyof ILogin) => {
    const state = {}
    state[key] = value
    this.setState(state)
  };
  
  submit = async () => {
    const { account, password } = this.state;
    try {
      const res = await axios.post('sign_in/user', {
        account,
        password
      })
      if (res.status === 200) {
        this.props.history.push('/')
      } else {
        message.error('账号或密码错误!')
      }
    } catch (e) {
      console.log(e)
    }
  };
  
  render() {
    const { account, password } = this.state
    return (
      <div className="login-wrapper">
        <h1>番茄时钟登录</h1>
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入注册账号" value={account} allowClear={true} onChange={(e) => this.onChange(e.target.value, 'account')} />
        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={password} placeholder="请输入密码" onChange={(e) => this.onChange(e.target.value, 'password')} />
        <Button className="loginButton" type="primary" onClick={this.submit}>登录</Button>
        <p>或者立即<Link to="/signup">注册</Link></p>
      </div>
    );
  }
}

export default Login;