import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuidv1 from 'uuid/v1';
import glamorous from 'glamorous';
import Select from 'react-select';

import { listCategories } from '../home/actions';
import { loadPostInfo } from '../post/actions';
import { createPost, updatePost } from './actions';
import TextArea from '../../component/TextArea';
import Input from '../../component/Input';
import CustomButton from '../../component/CustomButton';
import Container from '../../component/Container';

export function checkFormErrors(title, body, category) {
  return !title || !body || !category;
}

const EditForm = glamorous.form({
  display: 'flex',
  flexDirection: 'column'
});

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

  handleCategoryChange = event => this.setState({ category: event.value });

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

  getCategories = categories => {
    categories = categories.map((category, index) => ({
      value: category.name,
      label: category.name
    }));
    categories.unshift({ value: '', label: 'Select category' });
    return categories;
  };

  render() {
    const { categories } = this.props.home;
    const { title, body, category, editing } = this.state;

    return (
      <Container>
        <EditForm onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={title}
            onChange={this.handleTitleChange}
            placeholder="Title"
            css={{ marginTop: 20, marginBottom: 20 }}
          />
          <Select
            name="form-field-name"
            value={category}
            clearable={false}
            searchable={false}
            options={this.getCategories(categories)}
            disabled={editing}
            onChange={this.handleCategoryChange}
          />
          <TextArea
            value={body}
            onChange={this.handleBodyChange}
            placeholder="Body"
            css={{ marginTop: 20 }}
          />
          <CustomButton
            type="submit"
            disabled={checkFormErrors(title, body, category)}
            css={{ alignSelf: 'flex-end', width: 200, marginTop: 20 }}
          >
            Save
          </CustomButton>
        </EditForm>
      </Container>
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
