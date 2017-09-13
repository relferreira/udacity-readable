import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import addIcon from '../assets/ic_fab.png';

const FabContainer = glamorous.button({
  width: 56,
  height: 56,
  padding: 10,
  border: 'none',
  borderRadius: '50%',
  background: '#02d4c0',
  color: '#fff',
  boxShadow:
    '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  '& img': {
    width: '100%'
  }
});

const Fab = ({ css, onClick }) => (
  <FabContainer css={css} onClick={onClick}>
    <img src={addIcon} alt="add" />
  </FabContainer>
);

Fab.propTypes = {
  onClick: PropTypes.func
};

export default Fab;
