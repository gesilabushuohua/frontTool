/**
 * 绘画图形父类
 *
 */

const Draw = (function() {
  //  构造类，初始化数据
  let draw = function(context, w, h) {
    this.clientW = w;
    this.clientH = h;
    this.context = context;
    this.drawing = false;
  };
  //  开始绘画
  draw.prototype.openDraw = function() {
    this.drawing = true;
  };

  //  结束绘画
  draw.prototype.closeDraw = function() {
    this.drawing = false;
  };

  //  设置绘画样式
  draw.prototype.setDrawStyle = function() {
    this.context.lineWidth = '4';
    this.context.fillStyle = 'rgba(255,255,102,0.1)';
    this.context.strokeStyle = 'green';
  };

  //  清理绘画区域
  draw.prototype.clearCanvas = function() {
    this.context.clearRect(0, 0, this.clientW, this.clientH);
  };

  return draw;
})();
