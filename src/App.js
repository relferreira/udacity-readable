import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './container/home/Home';
import Post from './container/post/Post';
import EditPost from './container/edit-post/EditPost';
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
        <Route exact path="/:category?" component={Home} />
        <Route exact path="/:category/:id" component={Post} />
        <Route path="/:category/:id/edit" component={EditPost} />
      </div>
    );
  }
}

export default App;
