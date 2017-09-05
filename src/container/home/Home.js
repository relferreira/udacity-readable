import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { listCategories, listPosts } from './actions';
import { organizeValues } from '../../util/values-filter';

export function extractCategoryFromUrl(url) {
  let matches = url.match(/\?category=(.*)/);
  return matches ? matches[1] : null;
}

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
    let category = extractCategoryFromUrl(props.location.search);
    this.setState({ selectedCategory: category || null });
  };

  handleSortByChange = event => this.setState({ sortBy: event.target.value });

  handleOrderByChange = event => this.setState({ orderBy: event.target.value });

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
      <div>
        <h1>Home</h1>
        {!selectedCategory && (
          <div className="menu">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={`/?category=${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="posts">
          <select value={sortBy} onChange={this.handleSortByChange}>
            <option value="voteScore">Vote score</option>
            <option value="timestamp">Date</option>
          </select>
          <select value={orderBy} onChange={this.handleOrderByChange}>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
          {filteredPost.map((post, index) => (
            <div key={index}>
              <Link to={`/posts/${post.id}`}>Title: {post.title}</Link>
              <p>Category: {post.category}</p>
              <p>Author: {post.author}</p>
              <p>Date: {post.timestamp}</p>
              <p>Score: {post.voteScore}</p>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.home
});

const mapDispatchToProps = {
  listCategories,
  listPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
