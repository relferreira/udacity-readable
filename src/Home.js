import React, { Component } from 'react';
import { connect } from 'react-redux';

import { testRequest } from './reducers';

class Home extends Component {
  componentDidMount() {
    this.props.testRequest();
  }
  render() {
    const { categories } = this.props.data;
    return (
      <div>
        <h1>Home</h1>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.test
});

const mapDispatchToProps = {
  testRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
