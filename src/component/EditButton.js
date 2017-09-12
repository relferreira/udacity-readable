import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

import editIcon from '../assets/ic_edit.png';

const EditButton = ({ category, id }) => {
  return (
    <Link to={`/${category}/${id}/edit`}>
      <img src={editIcon} alt="edit" />
    </Link>
  );
};

EditButton.propTypes = {
  category: PropTypes.string,
  id: PropTypes.string
};

export default EditButton;
