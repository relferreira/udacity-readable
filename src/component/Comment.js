import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      editing: false
    };
  }

  handleEditClick = event =>
    this.setState({ body: this.props.comment.body, editing: true });

  handleBodyChange = event => this.setState({ body: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSave(this.props.comment.id, this.state.body);
    this.setState({ editing: false });
  };

  render() {
    const { comment } = this.props;
    const { body, editing } = this.state;
    return (
      <div>
        {!editing && (
          <div>
            <span>{JSON.stringify(comment)}</span>
            <button onClick={this.handleEditClick}>Edit</button>
          </div>
        )}
        {editing && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <textarea value={body} onChange={this.handleBodyChange} />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Comment;
