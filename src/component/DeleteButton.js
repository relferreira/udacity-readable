import React from 'react';
import glamorous from 'glamorous';

import deleteIcon from '../assets/ic_delete.png';

const ButtonContainer = glamorous.button({
  border: 'none',
  background: 'none',
  cursor: 'pointer'
});

const DeleteButton = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <img src={deleteIcon} alt="edit" />
    </ButtonContainer>
  );
};

export default DeleteButton;
