import React from 'react';
import glamorous from 'glamorous';

const ContainerStyle = glamorous.div({
  width: '994px',
  margin: '0 auto',
  '@media(max-width: 772px)': {
    width: '100%',
    '& .container-fluid': {
      padding: '0 0'
    }
  }
});

const Container = ({ children }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

export default Container;
