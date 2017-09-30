import React from 'react';
import Actor from './Actor';

export default function DancingFloor({ actors, handleClick, centerIndex, saveNode }) {
  const actorsDom = actors.map((actor, index) =>
    (<Actor
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
