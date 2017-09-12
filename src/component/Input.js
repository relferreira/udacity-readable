import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const InputStyle = glamorous.input({
  border: 'none',
  borderBottom: '1px solid #ccc'
});

const Input = ({ type, value, placeholder, onChange, css }) => {
  return (
    <InputStyle
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      css={css}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
