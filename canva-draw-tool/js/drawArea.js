/**
 * 调用绘画对象
 * 生成 canvas 画板
 * 初始化 绘画事件
 *
 */

const DrawArea = (function() {
  function _createCanvas(contain, w, h) {
    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    contain.appendChild(canvas);
    return canvas;
  }

  let drawArea = function(contain, w, h) {
    this.canvasObj = _createCanvas(contain, w, h);
    let context = this.canvasObj.getContext('2d');
    this.drawType = {
      polyline: new Polyline(context, w, h),
      rectangle: new Rectangle(context, w, h),
      circle: new Circle(context, w, h)
    };
    this.type = 'rectangle';
    this.drawObj = this.drawType[this.type];
    this._initCanvasEvent();
  };

  drawArea.prototype.setDrawType = function(type) {
    this.type = type;
    this.drawObj = this.drawType[type];
  };

  drawArea.prototype.drawAreaPosition = function(position) {
    this.drawObj.drawAreaPosition(position);
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
      that.drawObj.setSavePoint(e.layerX, e.layerY);
      that.drawObj.drawGraph();
      //  非多边形，松开左键结束事件
      if (that.type === 'polyline') return;
      console.log('onmouseup');
      that.drawObj.closeDraw();
    };

    that.canvasObj.ondblclick = function(e) {
      //  多边形，双击结束绘图
      if (that.type === 'polyline') {
        that.drawObj.setSavePoint(e.layerX, e.layerY);
        that.drawObj.drawGraph();
        that.drawObj.closeDraw();
      }
    };

    drawArea.prototype.destoryEvent = function() {
      this.canvasObj.onmousedown = null;
      this.canvasObj.onmousemove = null;
      this.canvasObj.onmouseup = null;
      this.canvasObj.ondblclick = null;
    };
  };
  return drawArea;
})();
