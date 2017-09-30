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
