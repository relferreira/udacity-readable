import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const TextAreaStyle = glamorous.textarea({
  resize: 'none',
  border: 'none',
  borderBottom: '1px solid #ccc'
});

const TextArea = ({ value, placeholder, onChange, css }) => {
  return (
    <TextAreaStyle
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      css={css}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default TextArea;
