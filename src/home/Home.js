import React, { Component } from 'react';
import { connect } from 'react-redux';

import { listCategories, listPosts } from './actions';

export function orderPosts(posts, sortBy, order) {
  return posts
    .filter(post => !post.deleted)
    .sort(
      (post1, post2) =>
        order === 'asc'
          ? post1[sortBy] - post2[sortBy]
          : post2[sortBy] - post1[sortBy]
    );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'desc',
      sortBy: 'voteScore'
    };
  }
  componentDidMount() {
    this.props.listCategories();
    this.props.listPosts();
  }
  render() {
    const { categories, posts } = this.props.data;
    const { orderBy, sortBy } = this.state;
    const filteredPost = orderPosts(posts, sortBy, orderBy);
    return (
      <div>
        <h1>Home</h1>
        <div className="menu">
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category.name}</li>
            ))}
          </ul>
        </div>
        <div className="posts">
          {filteredPost.map((post, index) => (
            <div key={index}>
              <p>Title: {post.title}</p>
              <p>Category: {post.category}</p>
              <p>Author: {post.author}</p>
              <p>Date: {post.timestamp}</p>
              <p>Score: {post.voteScore}</p>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.home
});

const mapDispatchToProps = {
  listCategories,
  listPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
