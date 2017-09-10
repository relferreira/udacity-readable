import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Vote from './Vote';

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

  handleDeleteClick = event => this.props.onDelete(this.props.comment.id);

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
            <button onClick={this.handleDeleteClick}>Delete</button>
            <Vote
              voteScore={comment.voteScore}
              onUpVote={() => this.props.onVote(comment.id, 'upVote')}
              onDownVote={() => this.props.onVote(comment.id, 'downVote')}
            />
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
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired
};

export default Comment;