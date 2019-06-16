import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

interface ISignUp {
  account: string,
  password: string
  passwordConfirmation: string 
}

class SignUp extends Component<any, ISignUp> {
  constructor (props:any) {
    super(props)
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    }
  }


  onChange = (value:string, key: keyof ISignUp) => {
    const state = {}
    state[key] = value
    this.setState(state)
  };
  
  submit = async () => {
    const { account, password, passwordConfirmation } = this.state;
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      })
    } catch (e) {
      console.log(e)
    }
  };
  
  render() {
    const { account, password, passwordConfirmation } = this.state
    return (
      <div className="sign-up-wrapper">
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入注册账号" value={account} allowClear={true} onChange={(e) => this.onChange(e.target.value, 'account')} />
        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={password} placeholder="请输入密码" onChange={(e) => this.onChange(e.target.value, 'password')} />
        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={passwordConfirmation} placeholder="请确认密码" onChange={(e) => this.onChange(e.target.value, 'passwordConfirmation')}  />
        <Button type="primary" onClick={this.submit}>注册</Button>
        <p>或者立即<Link to="/login">登录</Link></p>
      </div>
    );
  }
}

export default SignUp;