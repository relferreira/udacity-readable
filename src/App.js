import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={Post} />
      </div>
    );
  }
}

export default App;
