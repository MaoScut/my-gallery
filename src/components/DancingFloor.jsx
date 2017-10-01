import React from 'react';
import PropTypes from 'prop-types';
import Actor from './Actor';

export default function DancingFloor({ actors, handleClick, centerIndex, saveNode }) {
  const actorsDom = actors.map((actor, index) =>
    (<Actor
      key={actor.fileName}
      isCenter={index === centerIndex}
      saveNode={saveNode}
      actor={actor}
      seq={index}
    />));
  return (
    <div role="presentation" className="img-sec" onClick={handleClick}>
      {actorsDom}
    </div>
  );
}
DancingFloor.propTypes = {
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
  saveNode: PropTypes.func.isRequired,
};

