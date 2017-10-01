import PropTypes from 'prop-types';
import React from 'react';
import Switch from './Switch';

export default function ControlPanel({ actors, handleClick, centerIndex }) {
  const controllerDom = actors.map((actor, index) => (
    <Switch key={actor.fileName} actor={actor} seq={index} isCenter={index === centerIndex} />
  ));
  return (
    <nav role="presentation" onClick={handleClick}>
      {controllerDom}
    </nav>
  );
}

ControlPanel.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.shape({
    fileName: PropTypes.string,
    desc: PropTypes.string,
    title: PropTypes.string,
    imgURL: PropTypes.string,
    isInverse: PropTypes.bool,
    rotateZ: PropTypes.number,
    position: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
    }),
  })).isRequired,
  centerIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
