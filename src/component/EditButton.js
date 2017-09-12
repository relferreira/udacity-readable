import React from 'react';
import glamorous from 'glamorous';

import editIcon from '../assets/ic_edit.png';

const ButtonContainer = glamorous.button({
  border: 'none',
  background: 'none',
  cursor: 'pointer'
});

const EditButton = ({ onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <img src={editIcon} alt="edit" />
    </ButtonContainer>
  );
};

export default EditButton;
