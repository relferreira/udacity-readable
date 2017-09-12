import React from 'react';
import glamorous from 'glamorous';

const ButtonStyle = glamorous.button({
  padding: '8px 10px',
  fontSize: '14px',
  border: 'none',
  borderRadius: '3px',
  background: '#009688',
  color: '#fff',
  boxShadow:
    '0 10px 40px 0 rgba(62,57,107,0.07), 0 2px 9px 0 rgba(62,57,107,0.06)',
  cursor: 'pointer'
});

const CustomButton = ({ children, type, onClick, css }) => {
  return (
    <ButtonStyle type={type} onClick={onClick} css={css}>
      {children}
    </ButtonStyle>
  );
};

export default CustomButton;
