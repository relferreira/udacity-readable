import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [
  { value: 'asc', label: 'Ascendent' },
  { value: 'desc', label: 'Descendent' }
];

const OrderBy = ({ value, onOrderChange }) => {
  return (
    <Select
      name="form-field-name"
      value={value}
      clearable={false}
      searchable={false}
      options={options}
      onChange={onOrderChange}
    />
  );
};

OrderBy.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default OrderBy;
