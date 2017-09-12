import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [
  { value: 'voteScore', label: 'Vote score' },
  { value: 'timestamp', label: 'Date' }
];

const SortBy = ({ value, onSortChange }) => {
  return (
    <Select
      name="form-field-name"
      value={value}
      clearable={false}
      searchable={false}
      options={options}
      onChange={onSortChange}
    />
  );
};

SortBy.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default SortBy;
