import React from 'react';

export default function Switch({ seq, actor, isCenter }) {
  const className = `clickable controller-unit${actor.isInverse ?
    ' is-inverse' :
    ''}${isCenter ? ' big' : ''} `;
  return <span id={seq} className={className} />;
}
