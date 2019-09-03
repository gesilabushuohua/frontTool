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
    this.drawObj = new Rectangle(context, w, h);
    this.drawObj.setMultiple();
    this._initCanvasEvent();
  };

  drawArea.prototype.drawAreaByPosition = function(position) {
    this.drawObj.drawAreaByPosition(position);
  };

  drawArea.prototype.getCanvasObj = function() {
    return this.canvasObj;
  };

  drawArea.prototype.restPosition = function() {
    this.drawObj.restPosition();
  };

  drawArea.prototype.getPosition = function() {
    return this.drawObj.getPosition();
  };

  drawArea.prototype._initCanvasEvent = function() {
    let that = this;
    that.canvasObj.onmousedown = function(e) {
      that.drawObj.openDraw(e);
    };

    that.canvasObj.onmousemove = function(e) {
        that.drawObj.moveDraw(e);
    };

    that.canvasObj.onmouseup = function(e) {
        that.drawObj.closeDraw(e);
    };

    that.canvasObj.onmouseout = function(e) {
      that.drawObj.setcloseDrawing();
    }
  };

  drawArea.prototype.destoryEvent = function() {
    this.canvasObj.onmousedown = null;
    this.canvasObj.onmousemove = null;
    this.canvasObj.onmouseup = null;
    this.canvasObj.onmouseout = null;
  };
  return drawArea;
})();
