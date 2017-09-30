import React from 'react';
import ControllerUnit from './ControllerUnit';
import ImageFigure from './ImageFigure';
import * as store from '../store';

require('../style/App.scss');
// 大舞台
export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.inverse = this.inverse.bind(this);
    this.actorClick = this.actorClick.bind(this);
    this.state = {
      actors: store.imagesData,
      centerIndex: 0,
    };
  }
  componentDidMount() {
    const sHeight = this.stage.clientHeight;
    const sWidth = this.stage.clientWidth;
    const aHeight = this.actor0.clientHeight;
    const aWidth = this.actor0.clientWidth;
    store.setStageSize(sWidth, sHeight);
    store.setActorSize(aWidth, aHeight);
    store.disperse(0);
    this.setState({
      actors: store.imagesData,
    });
  }

  inverse(index) {
    const imgsArrangeArr = this.state.imgsArrangeArr;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr,
    });
  }
  actorClick(e) {
    if (e.target.className.includes('clickable')) {
      e.stopPropagation();
      const index = Number(e.target.id);
      store.disperse(index);
      this.setState({
        actor: store.imagesData,
        centerIndex: Number(index),
      });
    }
  }
  render() {
    const actorsDom = this.state.actors.map((actor, index) =>
      <ImageFigure
        isCenter={index === this.state.centerIndex}
        saveNode={node => this.actor0 = node}
        actor={actor}
        seq={index}
      />);
    return (
      <main className="stage" ref={main => this.stage = main}>
        <div role="presentation" className="img-sec" onClick={this.actorClick}>
          {actorsDom}
        </div>
      </main>
    );
  }
}
