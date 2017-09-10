import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuidv1 from 'uuid/v1';

import { listCategories } from '../home/actions';
import { loadPostInfo } from '../post/actions';
import { createPost, updatePost } from './actions';

export function checkFormErrors(title, body, category) {
  return !title || !body || !category;
}

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      category: '',
      editing: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id && id !== 'new') {
      this.props.loadPostInfo(id);
    }

    // List categories if not in memory
    const { categories } = this.props.home;
    if (!categories || categories.length === 0) this.props.listCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { post: postInfo } = nextProps.post;
    if (postInfo && postInfo.id) {
      this.setState({
        ...postInfo,
        editing: true
      });
    }
  }

  handleTitleChange = event => this.setState({ title: event.target.value });

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleCategoryChange = event =>
    this.setState({ category: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const redirectToHome = () => this.props.history.push('/');
    //creating
    if (!this.state.id) {
      let requestBody = {
        ...this.state,
        id: uuidv1(),
        timestamp: Date.now(),
        author: 'Renan'
      };
      this.props.createPost(requestBody).then(redirectToHome);
    } else {
      const { id, title, body } = this.state;
      this.props.updatePost(id, title, body).then(redirectToHome);
    }
  };

  checkErrors() {}

  render() {
    const { categories } = this.props.home;
    const { title, body, category, editing } = this.state;

    return (
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={title} onChange={this.handleTitleChange} />
          <textarea value={body} onChange={this.handleBodyChange} />
          <select
            value={category}
            onChange={this.handleCategoryChange}
            disabled={editing}
          >
            <option value={''}>Select category</option>
            {categories.map((category, index) => (
              <option key={index}>{category.name}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={checkFormErrors(title, body, category)}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  post: state.post,
  data: state.editPost
});

const mapDispatchToProps = {
  listCategories,
  loadPostInfo,
  createPost,
  updatePost
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
