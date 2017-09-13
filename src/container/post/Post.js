import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uuidv1 from 'uuid/v1';
import { Grid, Row, Col } from 'react-flexbox-grid';
import glamorous, { Div, Form } from 'glamorous';

import {
  loadPostInfo,
  loadComments,
  deletePost,
  createComment,
  editComment,
  deleteComment,
  votePost,
  voteComment
} from './actions';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';
import PostCard from '../../component/PostCard';
import Comment from '../../component/Comment';
import TextArea from '../../component/TextArea';
import CustomButton from '../../component/CustomButton';
import Loading from '../../component/Loading';
import Container from '../../component/Container';
import { organizeValues } from '../../util/values-filter';

const PostContainer = glamorous.div({
  margin: '20px auto'
});

const FiltersContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  '& .Select': {
    width: 150,
    marginRight: 10
  }
});

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

  handleSortByChange = event => this.setState({ sortBy: event.value });

  handleOrderByChange = event => this.setState({ orderBy: event.value });

  handleDelete = id => {
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
      parentId: postId,
      voteScore: 1
    };
    this.props.createComment(newComment).then(() => {
      this.setState({ newComment: '' });
    });
  };

  handleCommentEdit = (id, body) => {
    let timestamp = Date.now();
    this.props.editComment(id, timestamp, body);
  };

  handleCommentDelete = id => {
    this.props.deleteComment(id);
  };

  handleVote = (id, option) => this.props.votePost(id, option);

  handleCommentVote = (id, option) => this.props.voteComment(id, option);

  render() {
    const { post, comments, loading, loadingComments } = this.props.data;
    const { sortBy, orderBy, newComment } = this.state;
    const filteredComments = organizeValues(comments, sortBy, orderBy);
    if (!post) return null;
    if (!loading && !post.id)
      return <PostContainer>Post not found!</PostContainer>;
    return (
      <PostContainer>
        <Grid>
          <Row>
            <Col xs={12}>
              {loading ? (
                <Loading width={40} height={40} />
              ) : (
                <PostCard
                  id={post.id}
                  category={post.category}
                  title={post.title}
                  author={post.author}
                  timestamp={post.timestamp}
                  body={post.body}
                  voteScore={post.voteScore}
                  onVote={this.handleVote}
                  onDelete={this.handleDelete}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Div width="100%" marginTop={20}>
              <FiltersContainer>
                <SortBy value={sortBy} onSortChange={this.handleSortByChange} />
                <OrderBy
                  value={orderBy}
                  onOrderChange={this.handleOrderByChange}
                />
              </FiltersContainer>
            </Div>
          </Row>
        </Grid>
        <Container>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <Form
                  marginTop={20}
                  display="flex"
                  onSubmit={this.handleCommentSubmit}
                  css={{ margin: '20px 0' }}
                >
                  <TextArea
                    value={newComment}
                    placeholder="Leave a comment!"
                    onChange={this.handleNewCommentChange}
                    css={{ flex: 1 }}
                  />
                  <CustomButton type="submit" css={{ marginLeft: 20 }}>
                    Post
                  </CustomButton>
                </Form>
              </Col>
            </Row>
            <Row>
              {loadingComments ? (
                <Div width="100%" marginTop={20} textAlign="center">
                  <Loading />
                </Div>
              ) : (
                filteredComments.map((comment, index) => (
                  <Col key={index} xs={12}>
                    <Comment
                      comment={comment}
                      onSave={this.handleCommentEdit}
                      onDelete={this.handleCommentDelete}
                      onVote={this.handleCommentVote}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Grid>
        </Container>
      </PostContainer>
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
  deleteComment,
  votePost,
  voteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
