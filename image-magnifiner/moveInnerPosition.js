// 展示图片在大图内部
const MoveInnerPositioon = (function() {
  class Move {
    constructor(contain, sliderBox, showBox) {
      this.contain = contain;
      this.sliderBox = sliderBox;
      this.showBox = showBox;
    }

    sliderBoxMove(position) {
      let { left, top } = this.moveSliderBoxToPosition(position);
      this.moveShowBoxToPosition();
      return { left, top };
    }

    moveSliderBoxToPosition(sliderBoxPosition) {
      let { sx, sy, mx, my } = sliderBoxPosition;
      let { offsetWidth: sliderW, offsetHeight: sliderH } = this.sliderBox;
      let diffX = sx + mx;
      let diffY = sy + my;
      let { left, top } = judgePolyPositonRange(
        diffX,
        diffY,
        this.contain,
        this.sliderBox
      );
      /*  let { left: moveX, top: moveY } = judgePolyPositonRange(
        left - sliderW / 2,
        top - sliderH / 2,
        this.contain,
        this.sliderBox
      ); */

      let moveX = left - sliderW / 2;
      let moveY = top - sliderH / 2;
      this.sliderBox.style.left = `${moveX}px`;
      this.sliderBox.style.top = `${moveY}px`;
      console.log({ left, top, moveX, moveY });
      return { left, top };
    }

    moveShowBoxToPosition() {
      let { offsetLeft: sliderLeft, offsetTop: sliderTop } = this.sliderBox;
      let {
        offsetWidth: showW,
        offsetHeight: showH,
        offsetLeft: showLeft,
        offsetTop: showTop
      } = this.showBox;
      let { offsetWidth: parentW, offsetHeight: parentH } = this.contain;
      const moveBottom = parentH - showH;
      const moveRight = parentW - showW;
      const isMoveToLeft = sliderLeft > parentW / 2;
      const isMoveToTop = sliderTop > parentH / 2;
      // 展示框是否移动到顶部
      const isMoveTop = showTop !== 0 && isMoveToTop;
      // 展示框是否移动到底部
      const isMoveBottom = showTop !== moveBottom && !isMoveToTop;
      // 展示框是否移动到左侧
      const isMoveLeft = showLeft !== 0 && isMoveToLeft;
      // 展示框是否移动到右侧
      const isMoveRight = showLeft !== moveRight && !isMoveToLeft;
      if (!isMoveTop && !isMoveBottom && !isMoveLeft && !isMoveRight) {
        return;
      }

      let x = 0,
        y = 0;

      if (isMoveToTop) {
        y = 0;
      } else {
        y = moveBottom;
      }

      if (isMoveToLeft) {
        x = 0;
      } else {
        x = moveRight;
      }
      this.showBox.style.left = `${x}px`;
      this.showBox.style.top = `${y}px`;
    }
  }
  return Move;
})();
