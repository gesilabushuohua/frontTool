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

  //  设置开始位置
  draw.prototype.setStartPoint = function() {};

  //  设置结束位置
  draw.prototype.setMovePoint = function() {};

  //  设置结束位置
  draw.prototype.setEndPoint = function() {};

  //  设置绘画样式
  draw.prototype.setDrawStyle = function() {
    this.context.lineWidth = "4";
    this.context.fillStyle = "#0000ff";
    this.context.strokeStyle = "green";
  };
  //  绘画图形
  draw.prototype.drawGraph = function() {};

  //  返回位置坐标
  draw.prototype.getPosition = function() {};

  //  清理绘画区域
  draw.prototype.clearCanvas = function() {
    this.context.clearRect(0, 0, this.clientW, this.clientH);
  };

  // 测试代码
  draw.prototype.sayStatues = function() {
    console.log("sayStatues");
  };

  return draw;
})();