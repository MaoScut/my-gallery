const imagesData = require('./data/imagesData.json');

imagesData.forEach((img) => {
  img.imageURL = '/images/' + img.fileName;
  // 初始化，每个actor都在左上角
  img.rotateZ = 0;
  img.isInverse = false;
  img.position = {
    left: 0,
    top: 0,
  };
});

// 返回区间内的随机数，左闭右开
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}
function getHollowRandom(horizontalBound, verticalBound, horizontalHollow, verticalHollow) {
  let left = getRangeRandom(horizontalBound.start, horizontalBound.end);
  let top = getRangeRandom(verticalBound.start, verticalBound.end);
  while (left > horizontalHollow.start && left < horizontalHollow.end
    && top > verticalHollow.start && top < verticalHollow.end) {
    left = getRangeRandom(horizontalBound.start, horizontalBound.end);
    top = getRangeRandom(verticalBound.start, verticalBound.end);
  }
  return [left, top];
}

// 返回-30度到30度之间的随机数
function get30DegRandom() {
  return getRangeRandom(-30, 30);
}
// 舞台尺寸
const stageSize = {
  width: 1,
  height: 2,
};
// 图片单元的大小
const actorSize = {
  width: 1,
  height: 2,
};
// 固定是第一张图片是中心
function disperse(centerIndex) {
  // const imagesDataCopy = imagesData.slice();
  imagesData.forEach((actor, index) => {
    // 如果是0到stage.height的话，下面的图片会只有一个角
    if (index === centerIndex) {
      actor.position.top = (stageSize.height - actorSize.height) / 2;
      actor.position.left = (stageSize.width - actorSize.width) / 2;
      actor.rotateZ = 0;
      actor.isInverse = false;
    } else {
      const verticalBound = {
        start: -actorSize.height / 2,
        end: stageSize.height - (actorSize.height / 2),
      };
      const horizontalBound = {
        start: -actorSize.width / 2,
        end: stageSize.width - (actorSize.width / 2),
      };
      const verticalHollow = {
        start: (stageSize.height / 2) - (1.5 * actorSize.height),
        end: (stageSize.height / 2) + (actorSize.height / 2),
      };
      const horizontalHollow = {
        start: (stageSize.width / 2) - (1.5 * actorSize.width),
        end: (stageSize.width / 2) + (actorSize.width / 2),
      };
      const [left, top] = getHollowRandom(horizontalBound, verticalBound, horizontalHollow, verticalHollow);
      actor.position.left = left;
      actor.position.top = top;
      actor.rotateZ = get30DegRandom();
      actor.isInverse = false;
    }
  });
  return imagesData;
}
function inverse(index) {
  // 有个问题，现在把某张居中的图片反转了，那点击其他图片的时候，这张图片仍然是反转的
  // 这不是我想要的，在发散方法中加入isInverse属性的设置
  imagesData[index].isInverse = !imagesData[index].isInverse;
  return imagesData;
}
function setStageSize(width, height) {
  stageSize.height = height;
  stageSize.width = width;
}
function setActorSize(width, height) {
  actorSize.width = width;
  actorSize.height = height;
}
export {
  disperse,
  imagesData,
  setActorSize,
  setStageSize,
  inverse,
};
