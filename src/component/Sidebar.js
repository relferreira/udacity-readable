import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous, { Li } from 'glamorous';

const SidebarContainer = glamorous.ul({
  height: '100%',
  margin: 0,
  padding: 16,
  listStyle: 'none',
  textAlign: 'left',
  lineHeight: '30px',
  borderRadius: '5px',
  background: '#f6f6f6'
});

const Sidebar = ({ menus }) => {
  return (
    <SidebarContainer>
      {menus.map((menu, index) => (
        <Li key={index}>
          <Link to={`/${menu.path}`}>{menu.name}</Link>
        </Li>
      ))}
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  menus: PropTypes.array
};

export default Sidebar;
