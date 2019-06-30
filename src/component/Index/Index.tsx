import React, { Component } from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import axios from '../../config/axios'
import history from '../../config/history'
import Todos from '../Todos/Todos'
import Tomatos from '../Tomatos/Tomatos'
import Statistics from '../Statistics/Statistics'
import { connect } from 'react-redux'
import { initTodo } from '../../redux/action/todos'
import { initTomatoes } from '../../redux/action/tomatoes'

import './Index.scss'

interface IRouter {
  history: any
  initTodo: (payload: any) => void
  initTomatoes: (payload: any) => void
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
    await this.initUser()
    await this.getTodos()
    await this.getTomatoes() 
  }

  initUser = async () => {
    const res = await axios.get('/me')
    this.setState({user: res.data})
  }

  getTodos = async () => {
		try{
			const response = await axios.get('todos')
			const todos = response.data.resources.map((t: any)=>Object.assign({},t,{editing: false}))
			this.props.initTodo(todos)
		}catch (e) {
			throw new Error(e)
		}
	}

  getTomatoes = async ()=>{
		try {
			const response = await axios.get('tomatoes')
			this.props.initTomatoes(response.data.resources)
		}catch (e) {
			throw new Error(e)
		}
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
        <div className="Statistics">
          <Statistics />
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...ownProps
})

const mapDispatchToProps = {
  initTodo,
  initTomatoes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)