require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';



//get picture data array
// var imagesDatas = [
// 	{
// 		"fileName": "1.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "2.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "3.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "4.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "5.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "6.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},	
// 		{
// 		"fileName": "7.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "8.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "10.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	},
// 		{
// 		"fileName": "11.jpg",
// 		"title": "Heaven of time",
// 		"desc": "Never stop learning, come on, Mao!"
// 	}

// ];
var imagesDatas = require('../data/imagesDatas.json');
imagesDatas = (function genImageURL(imagesDatasArr){
	for(var i = 0; i<imagesDatasArr.length;i++){
		var singleImageData = imagesDatasArr[i];
		singleImageData.imageURL = require('../images/'+singleImageData.fileName);
		imagesDatasArr[i] = singleImageData;
	}

	return imagesDatasArr;
})(imagesDatas);

function getRangeRandom(low, height){
	return Math.ceil(Math.random()*(height - low)+low);
}

function get30DegRandom(){
	return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random()*30));
}

var ImageFigure = React.createClass({
	handleClick: function(e){
		//alert("!!");
		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else{
			this.props.center();
		}
		
		e.stopPropagation();
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
					<div className = "img-back" onClick = {this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>	
			</figure>
			);
	}
});

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
		}.bind(this);
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
  			<section className = "stage" ref = "stage">
     			<section className = "img-sec">
     				{imgFigures}
     			</section>
     			<nav className="controller-nav">
     				{controllerUnits}
     			</nav>
     		</section>
  		)
	}
})

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
})

AppComponent.defaultProps = {
};

export default AppComponent;

