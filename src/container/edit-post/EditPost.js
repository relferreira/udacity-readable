import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuidv1 from 'uuid/v1';
import glamorous from 'glamorous';
import Select from 'react-select';
import { showSnack } from 'react-redux-snackbar';

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

const FormFooter = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 20,
  '& .Select': {
    width: 200,
    marginRight: 20
  }
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
    const { loading } = nextProps.data;
    const { post: postInfo } = nextProps.post;
    if (!loading && postInfo && postInfo.id) {
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
    const redirectToHome = type => {
      this.props.showSnack('edit_post', {
        label: `Post ${type} with success!`,
        timeout: 5000
      });
      this.props.history.push('/');
    };
    //creating
    if (!this.state.id) {
      let requestBody = {
        ...this.state,
        id: uuidv1(),
        timestamp: Date.now(),
        author: 'Renan'
      };
      this.props.createPost(requestBody).then(() => redirectToHome('created'));
    } else {
      const { id, title, body } = this.state;
      this.props
        .updatePost(id, title, body)
        .then(() => redirectToHome('edited'));
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
            css={{ marginTop: 20, marginBottom: 20, fontSize: '20px' }}
          />
          <TextArea
            value={body}
            onChange={this.handleBodyChange}
            placeholder="Body"
            css={{ marginTop: 20, fontSize: '14px' }}
          />
          <FormFooter>
            <Select
              name="form-field-name"
              value={category}
              clearable={false}
              searchable={false}
              options={this.getCategories(categories)}
              disabled={editing}
              onChange={this.handleCategoryChange}
            />
            <CustomButton
              type="submit"
              disabled={checkFormErrors(title, body, category)}
              css={{ width: 200 }}
            >
              Save
            </CustomButton>
          </FormFooter>
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
  updatePost,
  showSnack
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
