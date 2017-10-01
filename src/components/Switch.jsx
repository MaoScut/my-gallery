import React from 'react';
import PropTypes from 'prop-types';

export default function Switch({ seq, actor, isCenter }) {
  const className = `clickable controller-unit${actor.isInverse ?
    ' is-inverse' :
    ''}${isCenter ? ' big' : ''} `;
  return <span id={seq} className={className} />;
}

Switch.propTypes = {
  seq: PropTypes.number.isRequired,
  actor: PropTypes.shape({
    fileName: PropTypes.string,
    desc: PropTypes.string,
    title: PropTypes.string,
    imgURL: PropTypes.string,
    isInverse: PropTypes.bool,
    position: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
    }),
  }).isRequired,
  isCenter: PropTypes.bool.isRequired,
};
