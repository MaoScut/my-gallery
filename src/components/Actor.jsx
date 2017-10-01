import React from 'react';
import PropTypes from 'prop-types';

export default function Actor({ actor, saveNode, seq, isCenter }) {
  const style = {
    left: actor.position.left,
    top: actor.position.top,
    // 是中间的图片，那么不要旋转，因为后面反转的时候是用类的，这里写在内联会覆盖的
    transform: isCenter ? null : `rotateZ(${actor.rotateZ}deg)`,
    zIndex: isCenter ? 100 : 0,
  };
  const className = `actor clickable ${actor.isInverse ? 'is-inverse' : ''}`;
  return (
    <div className={className} style={style} ref={saveNode} id={seq}>
      <figure className="clickable" id={seq}>
        <img className="clickable" id={seq} src={actor.imageURL} alt="" />
        <figcaption className="clickable" value={seq}>
          {actor.title}
        </figcaption>
      </figure>
      <div id={seq} className="img-back clickable">
        {actor.desc}
      </div>
    </div>
  );
}
Actor.propTypes = {
  seq: PropTypes.number.isRequired,
  actor: PropTypes.shape({
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
  }).isRequired,
  isCenter: PropTypes.bool.isRequired,
  saveNode: PropTypes.func.isRequired,
};
