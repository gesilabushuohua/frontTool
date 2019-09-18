const MoveToNextPosition = (function() {
  class Move {
    constructor(contain, sliderBox, showBox) {
      this.contain = contain;
      this.sliderBox = sliderBox;
      this.showBox = showBox;
    }

    setImageContain(imageContain) {
      this.imageContain = imageContain;
    }

    sliderBoxMove(position) {
      let { left, top } = this.moveSliderBoxToPosition(position);
      return { left, top };
    }

    moveSliderBoxToPosition(sliderBoxPosition) {
      let {
        offsetHeight: domH,
        offsetLeft: domLeft,
        offsetTop: domTop,
        offsetWidth: domW
      } = this.imageContain;
      let x = 0,
        y = 0;
      let { sx, sy, mx, my } = sliderBoxPosition;
      let diffX = sx + mx;
      let diffY = sy + my;
      let { left, top } = judgeSliderPositonRange(
        diffX,
        diffY,
        this.imageContain,
        this.sliderBox
      );
      x = domLeft + left;
      y = domTop + top;
      this.sliderBox.style.left = `${x}px`;
      this.sliderBox.style.top = `${y}px`;
      return { left, top };
    }

    moveShowBoxToPosition() {
      if (!this.imageContain) {
        return;
      }
      let x = 0,
        y = 0;
      let {
        offsetHeight: domH,
        offsetLeft: domLeft,
        offsetTop: domTop,
        offsetWidth: domW
      } = this.imageContain;
      let { offsetWidth: parentW, offsetHeight: parentH } = this.contain;
      let { offsetWidth: showBoxW, offsetHeight: showBoxH } = this.showBox;
      const isShowRight = parentW > domLeft + domW + showBoxW;
      const isShowBottom = parentH > domTop + showBoxH;
      if (isShowRight) {
        x = domLeft + domW;
        y = domTop;
      } else {
        x = domLeft - showBoxW;
      }
      if (isShowBottom) {
        y = domTop;
      } else {
        y = domTop + domH - showBoxH;
      }
      this.showBox.style.left = `${x}px`;
      this.showBox.style.top = `${y}px`;
    }
  }
  return Move;
})();
