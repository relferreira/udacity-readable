import React from 'react';
import { Link } from 'react-router-dom';
import glamorous, { H1, Div } from 'glamorous';
import PropTypes from 'prop-types';

const HeaderContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 16px',
  '& a': {
    textDecoration: 'none',
    color: 'inherit'
  }
});

const Header = ({ title, children }) => {
  return (
    <HeaderContainer>
      <H1 fontSize={30} flex={1}>
        <Link to="/">{title}</Link>
      </H1>
      <Div position="absolute" right="16px">
        {children}
      </Div>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
