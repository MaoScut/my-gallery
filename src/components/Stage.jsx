import React from 'react';
import ControlPanel from './ControlPanel';
import DancingFloor from './DancingFloor';
import * as store from '../store';

require('../style/App.scss');
// 大舞台
export default class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.inverse = this.inverse.bind(this);
    this.actorClick = this.actorClick.bind(this);
    this.saveNode = this.saveNode.bind(this);
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
    store.addListener(this.setState.bind(this));
    store.disperse(0);
  }
  saveNode(node) {
    this.actor0 = node;
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
      // 如果该图片是居中的，那么翻转，否则，移动到中间
      if (index === this.state.centerIndex) {
        store.inverse(index);
      } else {
        store.disperse(index);
      }
      this.setState({
        actor: store.imagesData,
        centerIndex: Number(index),
      });
    }
  }
  render() {
    return (
      <main className="stage" ref={(main) => { this.stage = main; }}>
        <DancingFloor
          actors={this.state.actors}
          handleClick={this.actorClick}
          centerIndex={this.state.centerIndex}
          saveNode={this.saveNode}
        />
        <ControlPanel
          actors={this.state.actors}
          handleClick={this.actorClick}
          centerIndex={this.state.centerIndex}
        />
      </main>
    );
  }
}
