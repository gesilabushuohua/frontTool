const MoveToNextPositioon = (function() {
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
      let { left, top } = judgePolyPositonRange(
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
      let previous = this.imageContain.previousElementSibling;
      let next = this.imageContain.nextElementSibling;
      let { offsetWidth: parentW, scrollTop } = this.contain;
      const isShowRight = parentW > domLeft + 2 * domW;
      if (isShowRight && next && next !== this.sliderBox) {
        let { offsetLeft: nextLeft, offsetTop: nextTop } = next;
        x = nextLeft;
        y = nextTop;
      }
      if (isShowRight && next === this.sliderBox) {
        x = domLeft + domW;
        y = domTop;
      }
      if (!isShowRight && previous) {
        let { offsetLeft: preLeft, offsetTop: preTop } = previous;
        x = preLeft;
        y = preTop;
      }
      this.showBox.style.left = `${x}px`;
      this.showBox.style.top = `${y}px`;
    }
  }
  return Move;
})();
