import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { listCategories, listPosts } from './actions';
import { votePost } from '../post/actions';
import { organizeValues } from '../../util/values-filter';
import Menu from '../../component/Menu';
import Vote from '../../component/Vote';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';
import PostCard from '../../component/PostCard';
import Loading from '../../component/Loading';

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
    this.props.listCategories();
    this.props.listPosts();
    this.checkSelectedCategory(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkSelectedCategory(nextProps);
  }

  checkSelectedCategory = props => {
    const { category } = props.match.params;
    this.setState({ selectedCategory: category || null });
  };

  handleSortByChange = event => this.setState({ sortBy: event.value });

  handleOrderByChange = event => this.setState({ orderBy: event.value });

  handleVote = (id, option) => this.props.votePost(id, option);

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
                    timestamp={post.timestamp}
                    voteScore={post.voteScore}
                    onVote={this.handleVote}
                  />
                </Col>
              ))}
            </Row>
          </Grid>
        </PostsContainer>
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
  votePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
