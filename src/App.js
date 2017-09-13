import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Snackbar } from 'react-redux-snackbar';
import 'react-select/dist/react-select.css';

import Header from './component/Header';
import Home from './container/home/Home';
import Post from './container/post/Post';
import EditPost from './container/edit-post/EditPost';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Readable" />
        <Route exact path="/:category?" component={Home} />
        <Route exact path="/:category/:id" component={Post} />
        <Route path="/:category/:id/edit" component={EditPost} />

        <Snackbar />
      </div>
    );
  }
}

export default App;
