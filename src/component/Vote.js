import React from 'react';
import PropTypes from 'prop-types';

const Vote = ({ voteScore, onUpVote, onDownVote }) => {
  return (
    <div>
      <button onClick={onUpVote}>+</button>
      <span>{voteScore}</span>
      <button onClick={onDownVote}>-</button>
    </div>
  );
};

Vote.propTypes = {
  voteScore: PropTypes.number,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
};

export default Vote;
