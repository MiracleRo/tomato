import React, { Component } from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import axios from '../../config/axios'
import history from '../../config/history'
import Todos from '../Todos/Todos'
import Tomatos from '../Tomatos/Tomatos'

import './Index.scss'

interface IRouter {
  history: any;
}

interface IUser {
  user: any
}

const logOut = () =>  {
  localStorage.setItem('x-token', '')
  history.push('login')
}

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logOut}>
      <Icon type="logout" />
      注销
    </Menu.Item>
  </Menu>
)

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

  render() {
    return (
      <div className="index-wrapper">
        <header>
          <span>logo</span>
          <div>
            <Dropdown overlay={menu}>
              <Button>
                {this.state.user.account}<Icon type="down" />
              </Button>
            </Dropdown> 
          </div>
        </header>
        <main>
          <Tomatos/>
          <Todos/>
        </main> 
      </div>
    );
  }
}

export default Index;