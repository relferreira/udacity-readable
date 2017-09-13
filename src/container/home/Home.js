import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { listCategories, listPosts, listCategoryPosts } from './actions';
import { votePost, deletePost } from '../post/actions';
import { organizeValues } from '../../util/values-filter';
import Menu from '../../component/Menu';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';
import PostCard from '../../component/PostCard';
import Loading from '../../component/Loading';
import Fab from '../../component/Fab';

export function extractCategoryFromUrl(url) {
  let matches = url.match(/\?category=(.*)/);
  return matches ? matches[1] : null;
}

const HomeContainer = glamorous.div({});

const PostsContainer = glamorous.div({
  marginTop: 20
});

const FiltersContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
  '& .Select': {
    width: 150,
    marginRight: 20
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'desc',
      sortBy: 'voteScore',
      selectedCategory: null
    };
  }
  componentDidMount() {
    let category = this.checkSelectedCategory(this.props);
    this.props.listCategories();
    if (!category) this.props.listPosts();
    else this.props.listCategoryPosts(category);
  }

  checkSelectedCategory = props => {
    const { category } = props.match.params;
    this.setState({ selectedCategory: category || null });
    return category;
  };

  handleSortByChange = event => this.setState({ sortBy: event.value });

  handleOrderByChange = event => this.setState({ orderBy: event.value });

  handleVote = (id, option) => this.props.votePost(id, option);

  handlePostDelete = id => this.props.deletePost(id);

  handleNewPostClick = () => this.props.history.push('/none/new/edit');

  render() {
    const { categories, posts, loading } = this.props.data;
    const { orderBy, sortBy, selectedCategory } = this.state;
    const filteredPost = organizeValues(
      posts,
      sortBy,
      orderBy,
      selectedCategory
    );
    return (
      <HomeContainer>
        {!selectedCategory && <Menu menus={categories} />}
        <FiltersContainer>
          <SortBy value={sortBy} onSortChange={this.handleSortByChange} />
          <OrderBy value={orderBy} onOrderChange={this.handleOrderByChange} />
        </FiltersContainer>
        {!loading && filteredPost.length === 0 && <h2>No Posts!</h2>}
        {loading && <Loading width={40} height={40} />}
        <PostsContainer>
          <Grid>
            <Row>
              {filteredPost.map((post, index) => (
                <Col key={index} xs={12} md={6}>
                  <PostCard
                    id={post.id}
                    category={post.category}
                    title={post.title}
                    author={post.author}
                    comments={post.comments}
                    timestamp={post.timestamp}
                    voteScore={post.voteScore}
                    onVote={this.handleVote}
                    onDelete={this.handlePostDelete}
                  />
                </Col>
              ))}
            </Row>
          </Grid>
        </PostsContainer>
        <Fab
          onClick={this.handleNewPostClick}
          css={{ position: 'fixed', bottom: 16, right: 16 }}
        />
      </HomeContainer>
    );
  }
}

const mapStateToProps = state => ({
  data: state.home
});

const mapDispatchToProps = {
  listCategories,
  listPosts,
  listCategoryPosts,
  votePost,
  deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
