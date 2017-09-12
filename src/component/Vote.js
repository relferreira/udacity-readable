import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import addIcon from '../assets/ic_add.png';
import removeIcon from '../assets/ic_remove.png';

const IconButton = glamorous.button({
  border: 'none',
  background: 'none',
  cursor: 'pointer'
});

const VoteContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const Vote = ({ voteScore, onUpVote, onDownVote }) => {
  return (
    <VoteContainer>
      <IconButton onClick={onDownVote}>
        <img src={removeIcon} alt="down vote" />
      </IconButton>
      <span>{voteScore}</span>
      <IconButton onClick={onUpVote}>
        <img src={addIcon} alt="up vote" />
      </IconButton>
    </VoteContainer>
  );
};

Vote.propTypes = {
  voteScore: PropTypes.number,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};

export default Vote;
