import React from 'react';
import glamorous, { H1 } from 'glamorous';
import PropTypes from 'prop-types';

const HeaderContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 16px',
  textAlign: 'left',
  background: '#ccc'
});

const Header = ({ title, children }) => {
  return (
    <HeaderContainer>
      <H1 fontSize={20} flex={1}>
        {title}
      </H1>
      {children}
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
