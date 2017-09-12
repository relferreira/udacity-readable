import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import { listCategories, listPosts } from './actions';
import { votePost } from '../post/actions';
import { organizeValues } from '../../util/values-filter';
import Menu from '../../component/Menu';
import Vote from '../../component/Vote';
import SortBy from '../../component/SortBy';
import OrderBy from '../../component/OrderBy';

export function extractCategoryFromUrl(url) {
  let matches = url.match(/\?category=(.*)/);
  return matches ? matches[1] : null;
}

const HomeContainer = glamorous.div({});

const PostsContainer = glamorous.div({
  flex: 1
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

  handleSortByChange = event => this.setState({ sortBy: event.target.value });

  handleOrderByChange = event => this.setState({ orderBy: event.target.value });

  handleVote = (id, option) => this.props.votePost(id, option);

  render() {
    const { categories, posts } = this.props.data;
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
        <PostsContainer>
          <SortBy value={sortBy} onSortChange={this.handleSortByChange} />
          <OrderBy value={orderBy} onOrderChange={this.handleOrderByChange} />
          {filteredPost.map((post, index) => (
            <div key={index}>
              <Link to={`/${post.category}/${post.id}`}>
                Title: {post.title}
              </Link>
              <p>Category: {post.category}</p>
              <p>Author: {post.author}</p>
              <p>Date: {post.timestamp}</p>
              <p>Score: {post.voteScore}</p>
              <Vote
                voteScore={post.voteScore}
                onUpVote={() => this.handleVote(post.id, 'upVote')}
                onDownVote={() => this.handleVote(post.id, 'downVote')}
              />
              <br />
            </div>
          ))}
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
