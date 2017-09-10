import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadPostInfo, loadComments, deletePost } from './actions';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';
import { organizeValues } from '../../util/values-filter';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'desc',
      sortBy: 'voteScore'
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

  render() {
    const { post, comments } = this.props.data;
    const { sortBy, orderBy } = this.state;
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
  loadComments,
  deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
