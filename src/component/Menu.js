import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import { Grid, Row, Col } from 'react-flexbox-grid';

const MenuContainer = glamorous.div({
  '& a': {
    color: '#009688',
    textDecoration: 'none'
  }
});

const Menu = ({ menus }) => {
  return (
    <MenuContainer>
      <Grid>
        <Row>
          {menus.map((menu, index) => (
            <Col key={index} xs={4}>
              <Link to={`/${menu.path}`}>{menu.name}</Link>
            </Col>
          ))}
        </Row>
      </Grid>
    </MenuContainer>
  );
};

Menu.propTypes = {
  menus: PropTypes.array
};

export default Menu;
