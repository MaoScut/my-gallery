import React from 'react';
// 图片组件

// export default class ImageFigure extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }
//   handleClick(e) {
//     // 如果这张图片是居中的，那么触发大管家的inverse方法，否则，触发大管家的center方法
//     if (this.props.arrange.isCenter) {
//       this.props.inverse();
//     } else {
//       this.props.center();
//     }
//     // 阻止事件冒泡，此元素的父元素不会被触发点击事件
//     e.stopPropagation();
//     // 阻止浏览器的默认行为
//     e.preventDefault();
//   }
//   render() {
//     let styleObj = {};
//     if (this.props.arrange.pos) {
//       styleObj = this.props.arrange.pos;
//     }

//     if (this.props.arrange.rotate) {
//       ['Moz', 'ms', 'Webkit', ''].forEach(function (value) {
//         styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
//       }.bind(this))
//     }
//     if (this.props.arrange.isCenter) {
//       styleObj.zIndex = 11;
//     }
//     let imgFigureClassName = 'img-figure';
//     imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
//     return (
//       <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
//         <img src={this.props.data.imageURL} />
//         <figcaption>
//           <h2 className="img-tit">{this.props.data.title}</h2>
//         </figcaption>
//         <div className="img-back" onClick={this.handleClick}>
//           <p>
//             {this.props.data.desc}
//           </p>
//         </div>
//       </figure>
//     );
//   }
// }
export default function ImageFigure({ actor, saveNode, seq, isCenter }) {
  const style = {
    left: actor.position.left,
    top: actor.position.top,
    transform: `rotateZ(${actor.rotateZ}deg)`,
    zIndex: isCenter ? 100 : 0,
  };
  return (
    <div className="actor clickable" style={style} ref={saveNode} id={seq}>
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
