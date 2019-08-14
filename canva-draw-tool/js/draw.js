/**
 * 绘画图形父类
 *
 */

const Draw = function() {
  //  构造对象，初始化数据
  const draw = function() {};

  //  设置图形起始点

  //  设置图像移动点

  //  结束绘画

  //  设置绘画样式
  function _setRectStyle() {
    this.context.lineWidth = '4';
    this.context.fillStyle = '#0000ff';
    this.context.strokeStyle = 'green';
  }
  //  绘画图形

  //  清理绘画区域
  function _clearCanvas() {
    this.context.clearRect(0, 0, this.clientW, this.clientH);
  }
  //  获取返回绘画数据

  return class {
    constructor(canvasDom) {
      this.canvasDom = canvasDom;
      this.clientW = canvasDom.clientWidth;
      this.clientH = canvasDom.clientHeight;
      this.context = canvasDom.getContext('2d');
      this.drawing = false;
      this.position = {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0
      };
      this.setRectStyle = _setRectStyle.bind(this);
      this.clearCanvas = _clearCanvas.bind(this);
    }
  };
};
