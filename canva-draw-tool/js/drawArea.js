/**
 * 调用绘画对象
 * 生成 canvas 画板
 * 初始化 绘画事件
 *
 */

const DrawArea = (function() {
  function _createCanvas(contain, w, h) {
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    contain.appendChild(canvas);
    return canvas;
  }

  let drawArea = function(contain, w, h) {
    this.canvasObj = _createCanvas(contain, w, h);
    this.drawType = 'polyline';
    let context = this.canvasObj.getContext("2d");
    // this.drawObj = new Rectangle(context, w, h);
    // this.drawObj = new Circle(context, w, h);
    this.drawObj = new Polyline(context, w, h);
    this._initCanvasEvent();
  };

  drawArea.prototype.setDrawType = function(type) {
    let drawType = null;
    this.drawObj = drawType[type];
  };
  drawArea.prototype._initCanvasEvent = function() {
    let that = this;
    that.canvasObj.onmousedown = function(e) {
      //  根据绘画状态，清空存储数据
      that.drawObj.setStartPoint(e.layerX, e.layerY);
      that.drawObj.openDraw();
    };

    that.canvasObj.onmousemove = function(e) {
      that.drawObj.setMovePoint(e.layerX, e.layerY);
      that.drawObj.drawGraph();
    };

    that.canvasObj.onmouseup = function(e) {
        that.drawObj.setMovePoint(e.layerX, e.layerY);
        that.drawObj.drawGraph();
        that.drawObj.closeDraw();
    };
  
  };
  return drawArea;
})();
