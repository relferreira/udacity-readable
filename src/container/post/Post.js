import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadPostInfo, loadComments } from './reducer';

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.loadPostInfo(id);
    this.props.loadComments(id);
  }

  render() {
    const { post, comments } = this.props.data;
    return (
      <div>
        <h1>Post</h1>
        <p>Title: {post.title}</p>
        <p>Category: {post.category}</p>
        <p>Author: {post.author}</p>
        <p>Date: {post.timestamp}</p>
        <p>Score: {post.voteScore}</p>

        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index}>{JSON.stringify(comment)}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.post
});

const mapDispatchToProps = {
  loadPostInfo,
  loadComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
