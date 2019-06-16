import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './component/Index/Index';
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';

class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
      </Router>
    );
  }
}

export default App;
