import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Vote from './Vote';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import TextArea from './TextArea';
import CustomButton from './CustomButton';

const CommentContainer = glamorous.div({
  display: 'flex',
  padding: 16,
  borderBottom: '1px solid #ccc'
});

const CommentForm = glamorous.form({
  display: 'flex',
  flex: 1,
  padding: 0
});

const CommentBody = glamorous.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  textAlign: 'left'
});

const CommentInfo = glamorous.div({
  fontSize: '14px',
  '& h4': {
    margin: '0 0'
  }
});

const CommentSidebar = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

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
          <CommentContainer>
            <CommentBody>
              <CommentInfo>
                <h4>{comment.author}</h4>
                <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
              </CommentInfo>
              <p>{comment.body}</p>
            </CommentBody>
            <CommentSidebar>
              <DeleteButton onClick={this.handleDeleteClick} />
              <EditButton onClick={this.handleEditClick} />
              <Vote
                voteScore={comment.voteScore}
                onUpVote={() => this.props.onVote(comment.id, 'upVote')}
                onDownVote={() => this.props.onVote(comment.id, 'downVote')}
              />
            </CommentSidebar>
          </CommentContainer>
        )}
        {editing && (
          <CommentContainer>
            <CommentForm onSubmit={this.handleSubmit}>
              <CommentBody>
                <TextArea value={body} onChange={this.handleBodyChange} />
              </CommentBody>
              <CommentSidebar>
                <CustomButton css={{ marginLeft: '20px' }} type="submit">
                  Save
                </CustomButton>
              </CommentSidebar>
            </CommentForm>
          </CommentContainer>
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
