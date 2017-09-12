import React from 'react';
import PropTypes from 'prop-types';
import { Img } from 'glamorous';

import LoadingIndicator from '../assets/rolling.gif';

const Loading = ({ width, height, css }) => {
  return (
    <Img
      src={LoadingIndicator}
      alt="loading indicator"
      width={width}
      height={height}
      css={css}
    />
  );
};

Loading.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Loading.defaultProps = {
  width: 24,
  height: 24
};

export default Loading;
