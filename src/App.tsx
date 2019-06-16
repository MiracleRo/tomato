import React, { Component } from 'react';
import './App.scss';
import { Router, Route } from 'react-router-dom';
import Index from './component/Index/Index';
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import history from './config/history'

class App extends Component<{}> {
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </Router>
    );
  }
}

export default App;
