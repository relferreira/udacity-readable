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
        <Route exact path="/" component={Home} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/edit-post/:id" component={EditPost} />
      </div>
    );
  }
}

export default App;
