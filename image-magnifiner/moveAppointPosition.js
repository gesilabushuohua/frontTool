// 展示图片在大图内部
const MoveAppointPosition = (function() {
  class Move {
    constructor(contain, sliderBox, showBox) {
      this.contain = contain;
      this.sliderBox = sliderBox;
      this.showBox = showBox;
    }

    sliderBoxMove(position) {
      let { left, top } = this.moveSliderBoxToPosition(position);
      return { left, top };
    }

    moveSliderBoxToPosition(sliderBoxPosition) {
      let { sx, sy, mx, my } = sliderBoxPosition;
      let diffX = sx + mx;
      let diffY = sy + my;
      let { left, top } = judgeSliderPositonRange(
        diffX,
        diffY,
        this.contain,
        this.sliderBox
      );
      this.sliderBox.style.left = `${left}px`;
      this.sliderBox.style.top = `${top}px`;
      return { left, top };
    }

    moveShowBoxToPosition() {}
  }
  return Move;
})();
