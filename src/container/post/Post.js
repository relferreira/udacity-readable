import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as uuidv1 from 'uuid/v1';

import {
  loadPostInfo,
  loadComments,
  deletePost,
  createComment,
  editComment,
  deleteComment
} from './actions';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';
import Comment from '../../component/Comment';
import { organizeValues } from '../../util/values-filter';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'desc',
      sortBy: 'voteScore',
      newComment: ''
    };
  }
  componentDidMount() {
    const id = this.getPostId();

    this.props.loadPostInfo(id);
    this.props.loadComments(id);
  }

  getPostId = () => {
    const { id } = this.props.match.params;
    return id;
  };

  handleSortByChange = event => this.setState({ sortBy: event.target.value });

  handleOrderByChange = event => this.setState({ orderBy: event.target.value });

  handleDelete = event => {
    event.preventDefault();
    const id = this.getPostId();
    this.props.deletePost(id).then(() => this.props.history.replace('/'));
  };

  handleNewCommentChange = event =>
    this.setState({ newComment: event.target.value });

  handleCommentSubmit = event => {
    event.preventDefault();
    const postId = this.getPostId();
    let newComment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: this.state.newComment,
      author: 'Renan',
      parentId: postId
    };
    this.props.createComment(newComment).then(() => {
      this.setState({ newComment: '' });
      this.props.loadComments(postId);
    });
  };

  handleCommentEdit = (id, body) => {
    let timestamp = Date.now();
    this.props
      .editComment(id, timestamp, body)
      .then(() => this.props.loadComments(this.getPostId()));
  };

  handleCommentDelete = id => {
    this.props
      .deleteComment(id)
      .then(() => this.props.loadComments(this.getPostId()));
  };

  render() {
    const { post, comments } = this.props.data;
    const { sortBy, orderBy, newComment } = this.state;
    const filteredComments = organizeValues(comments, sortBy, orderBy);
    return (
      <div>
        <Link to={`/edit-post/${post.id}`}>Edit</Link>
        <a href="" onClick={this.handleDelete}>
          Delete
        </a>
        <h1>Post</h1>
        <p>Title: {post.title}</p>
        <p>Category: {post.category}</p>
        <p>Author: {post.author}</p>
        <p>Date: {post.timestamp}</p>
        <p>Score: {post.voteScore}</p>

        <div className="comments">
          <SortBy value={sortBy} onSortChange={this.handleSortByChange} />
          <OrderBy value={orderBy} onOrderChange={this.handleOrderByChange} />
          {filteredComments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onSave={this.handleCommentEdit}
              onDelete={this.handleCommentDelete}
            />
          ))}
        </div>
        <div className="new-comment">
          <form onSubmit={this.handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={this.handleNewCommentChange}
            />
            <button type="submit">Post</button>
          </form>
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
  loadComments,
  deletePost,
  createComment,
  editComment,
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
