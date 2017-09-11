import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Header from './component/Header';
import Home from './container/home/Home';
import Post from './container/post/Post';
import EditPost from './container/edit-post/EditPost';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Readable">
          <Link to="none/new/edit">New post</Link>
        </Header>
        <Route exact path="/:category?" component={Home} />
        <Route exact path="/:category/:id" component={Post} />
        <Route path="/:category/:id/edit" component={EditPost} />
      </div>
    );
  }
}

export default App;
