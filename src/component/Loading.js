import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../assets/rolling.gif';

const Loading = ({ width, height }) => {
  return (
    <img
      src={LoadingIndicator}
      alt="loading indicator"
      width={width}
      height={height}
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
