import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import editIcon from '../assets/ic_edit.png';

const EditButton = ({ category, id, onClick }) => {
  return (
    <Link to={`/${category}/${id}/edit`} onClick={onClick}>
      <img src={editIcon} alt="edit" />
    </Link>
  );
};

EditButton.propTypes = {
  category: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func
};

export default EditButton;
