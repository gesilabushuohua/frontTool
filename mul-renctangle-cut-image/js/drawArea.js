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
    this.drawObj = this.drawType[this.type];
  };

  drawArea.prototype.drawAreaByPosition = function(position) {
    this.drawObj.drawAreaByPosition(position);
  };

  drawArea.prototype.getCanvasObj = function() {
    return this.canvasObj;
  };

  drawArea.prototype.resetCanvasAndPsition = function() {
    this.drawObj.resetCanvasAndPsition();
  };

  drawArea.prototype.getPosition = function() {
    return this.drawObj.getPosition();
  };

  drawArea.prototype._initCanvasEvent = function() {
    let that = this;
    that.canvasObj.onmousedown = function(e) {
      that.drawObj.openDraw(e);
      /* if (that.type !== 'polyline') {
        that.drawObj.setStartPoint(e.layerX, e.layerY);
      } */
    };

    that.canvasObj.onmousemove = function(e) {
      that.drawObj.Movedraw(e);
    };

    that.canvasObj.onmouseup = function(e) {
      if (that.type !== 'polyline') {
        that.drawObj.closedraw(e);
      }
    };

    that.canvasObj.onmouseout = function(e) {
      if (that.type !== 'polyline') {
        that.drawObj.closeDraw(e);
      }
    };
  };

  drawArea.prototype.destoryEvent = function() {
    this.canvasObj.onmousedown = null;
    this.canvasObj.onmousemove = null;
    this.canvasObj.onmouseup = null;
    this.canvasObj.onmouseout = null;
  };

  return drawArea;
})();
