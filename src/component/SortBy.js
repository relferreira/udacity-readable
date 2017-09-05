import React from 'react';
import PropTypes from 'prop-types';

const SortBy = ({ value, onSortChange }) => {
  return (
    <select value={value} onChange={onSortChange}>
      <option value="voteScore">Vote score</option>
      <option value="timestamp">Date</option>
    </select>
  );
};

SortBy.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default SortBy;
