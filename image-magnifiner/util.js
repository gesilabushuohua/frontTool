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

function judgePolyPositonRange(left, top, parentDom, dom) {
  let { clientWidth: parentW, clientHeight: parentH } = parentDom;
  let { clientWidth: domW, clientHeight: domH } = dom;
  const minLfet = 0;
  const minTop = 0;
  const maxLfet = parentW - domW;
  const maxTop = parentH - domH;
  return {
    left: judgeRange(left, minLfet, maxLfet),
    top: judgeRange(top, minTop, maxTop)
  };
}
