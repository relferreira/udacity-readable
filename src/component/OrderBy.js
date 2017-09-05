import React from 'react';
import PropTypes from 'prop-types';

const OrderBy = ({ value, onOrderChange }) => {
  return (
    <select value={value} onChange={onOrderChange}>
      <option value="asc">Ascendent</option>
      <option value="desc">Descendent</option>
    </select>
  );
};

OrderBy.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default OrderBy;
