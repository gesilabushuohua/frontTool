function judgeRange(value, min, max) {
  let result = 0;
  if (value < min) {
    result = min;
  } else if (value > max) {
    result = max;
  } else {
    result = value;
  }
  return result;
}

function judgeSliderPositonRange(x, y, parentDom, slider) {
  let { clientWidth: parentW, clientHeight: parentH } = parentDom;
  let { clientWidth: domW, clientHeight: domH } = slider;
  // 滑块边界
  const minLfet = 0;
  const minTop = 0;
  const maxLfet = parentW - domW;
  const maxTop = parentH - domH;

  // 鼠标是否可位于滑块中心位置，临界条件
  const minCenterX = domW / 2;
  const minCenterY = domH / 2;
  const maxCenterX = parentW - minCenterX;
  const maxCenterY = parentH - minCenterY;
  console.log();
  let left = 0,
    top = 0;
  if (x < minCenterX) {
    left = minLfet;
  } else if (x > maxCenterX) {
    left = maxLfet;
  } else {
    left = x - minCenterX;
  }

  if (y < minCenterY) {
    top = minTop;
  } else if (y > maxCenterY) {
    top = maxTop;
  } else {
    top = y - minCenterY;
  }

  return {
    left,
    top
  };
}
