import React from 'react';
import glamorous from 'glamorous';

const ContainerStyle = glamorous.div({
  width: '994px',
  margin: '0 auto'
});

const Container = ({ children }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

export default Container;
