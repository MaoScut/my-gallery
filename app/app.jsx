import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
require('../style/App.scss');

//获取图片数据
var imagesDatas = require('../data/imagesDatas.json');
imagesDatas = (function genImageURL(imagesDatasArr){
	for(var i = 0; i<imagesDatasArr.length;i++){
		var singleImageData = imagesDatasArr[i];
		singleImageData.imageURL = require('../images/'+singleImageData.fileName);
		imagesDatasArr[i] = singleImageData;
	}
	console.log(imagesDatasArr.length);
	return imagesDatasArr;
})(imagesDatas);
//返回区间内的随机数，左闭右开
function getRangeRandom(low, height){
	return Math.ceil(Math.random()*(height - low)+low);
}

//返回-30度到30度之间的随机数
function get30DegRandom(){
	return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random()*30));
}

//图片组件
var ImageFigure = React.createClass({
	handleClick: function(e){
		//alert("!!");
		//如果这张图片是居中的，那么触发大管家的inverse方法，否则，触发大管家的center方法
		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else{
			this.props.center();
		}
		
		//阻止事件冒泡，此元素的父元素不会被触发点击事件
		e.stopPropagation();
		//阻止浏览器的默认行为
		e.preventDefault();
	},

	render:function(){
		var styleObj = {};
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		if(this.props.arrange.rotate){
			['Moz', 'ms', 'Webkit', ''].forEach(function(value){
				styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this))
			
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}

		var imgFigureClassName = "img-figure";
		imgFigureClassName += this.props.arrange.isInverse ? " is-inverse" : "";
		return(
			<figure className = {imgFigureClassName} style = {styleObj} onClick = {this.handleClick}>
				<img src={this.props.data.imageURL}/>
				<figcaption>
					<h2 className = "img-tit">{this.props.data.title}</h2>
				</figcaption>
				<div className = "img-back" onClick = {this.handleClick}>
					<p>
						{this.props.data.desc}
					</p>
				</div>	
			</figure>
			);
	}
});

//最外层组件
var AppComponent = React.createClass({
	Constant:{
		centerPos:{
			left:0,
			right:0,
		},
		hPosRange:{
			leftSecX:[0,0],
			rightSecX:[0,0],
			y:[0,0],
		},
		vPosRange:{
			x:[0,0],
			topY:[0,0]
		}
	},

	inverse: function(index){
		return function(){
			var imgsArrangeArr = this.state.imgsArrangeArr;
			//debugger;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
			//debugger;
		}.bind(this);//绑定函数提中的this到大舞台
	},

	reArrange: function(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
		Constant = this.Constant,
		centerPos = Constant.centerPos,
		hPosRange = Constant.hPosRange,
		vPosRange = Constant.vPosRange,
		hPosRangeLeftSecX = hPosRange.leftSecX,
		hPosRangeRightSecX = hPosRange.rightSecX,
		hPosRangeY = hPosRange.y,
		vPosRangeTopY = vPosRange.topY,
		vPosRangeX = vPosRange.x,
		imgsArrangeTopArr = [],
		topImgNum = Math.floor(Math.random()*2),
		topImgSpliceIndex = 0,
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

		imgsArrangeCenterArr[0] = {
			pos: centerPos,
			rotate: 0,
			isCenter: true
		};

		topImgSpliceIndex = Math.ceil(Math.random()*( imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

		imgsArrangeTopArr.forEach(function(value, index){
			imgsArrangeTopArr[index] = {
				pos:{
					top: getRangeRandom( vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate:get30DegRandom(),
				isCenter: false
			}
		});

		for(var i = 0, j = imgsArrangeArr.length, k = j/2; i < j; i++){
			var hPosRangeLORX = null;
			if(i<k){
				hPosRangeLORX = hPosRangeLeftSecX;
			}
			else
			{
				hPosRangeLORX = hPosRangeRightSecX;
			}
			imgsArrangeArr[i]={
				pos:{
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
				isCenter:false
			}
		}

		//debugger;
		if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
		}
		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
		this.setState({
			imgsArrangeArr: imgsArrangeArr
		});
	
	},

	center: function(index){
		return function(){
			this.reArrange(index);
		}.bind(this);
	},

	getInitialState: function(){
		return {
			imgsArrangeArr:[
			/*{
				pos:{
					left: '0',
					top: '0'
				},
				rotate: 0,
				isInverse: false,
				isCenter: false
			}*/]
		}
	},
	//节点渲染完成后做的事情
	componentDidMount:function(){
		//get stage width
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
		stageW = stageDOM.scrollWidth,//scrollWidth means what?
		stageH = stageDOM.scrollHeight,
		halfStageW = Math.ceil(stageW/2),
		halfStageH = Math.ceil(stageH/2);

		//get imgsize
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),

		imgH = imgFigureDOM.scrollHeight,
		imgW = imgFigureDOM.scrollWidth,
		halfImgH = Math.ceil(imgH/2),
		halfImgW = Math.ceil(imgW/2);

		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};

		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = 0 - halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		this.reArrange(0);
	},
	render:function(){
		var imgFigures = [];
		var controllerUnits=[];

  		imagesDatas.forEach(function(value, index){
  			if(!this.state.imgsArrangeArr[index]){
  				this.state.imgsArrangeArr[index] = {
  					pos:{
  						left: 0,
  						top: 0
  					},
  					rotate: 0,
  					isInverse: false,
  					isCenter: false
  				}
  			}
  			 var _ref = 'imgFigure'+ index;
  			// console.log(_ref);
  			// var _value = value;
  			// var _imgsArr = this.state.imgsArrangeArr[index];
  			// console.log(_value);
  			// console.log(_imgsArr);
  			imgFigures.push(<ImageFigure key = {_ref} ref = {_ref} data = {value} arrange = {this.state.imgsArrangeArr[index]} inverse = {this.inverse(index)} center = {this.center(index)} />);
  			controllerUnits.push(<ControllerUnit key = {index} arrange = {this.state.imgsArrangeArr[index]} inverse = {this.inverse(index)} center = {this.center(index)} />);
  		}.bind(this));
  		return(
  			<main className = "stage" ref = "stage">
     			<div className = "img-sec">
     				{imgFigures}
     			</div>
     			<nav className="controller-nav">
     				{controllerUnits}
     			</nav>
     		</main>
  		)
	}
});

//控制组件
var ControllerUnit = React.createClass({
	handleClick: function(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();

	},
	render:function(){
		var controllerUnitClassName = "controller-unit";
		if(this.props.arrange.isCenter)
		{
			controllerUnitClassName += " is-center";
			if(this.props.arrange.isInverse){
				//debugger;
				controllerUnitClassName += " is-inverse";
			}
		}
		return(
			<span className = {controllerUnitClassName} onClick = {this.handleClick}></span>
			)
	}
});

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
				<AppComponent />
			)
	}
};

var app = document.createElement('div');
app.className = "content";
document.body.appendChild(app);
ReactDOM.render(<App />, app);