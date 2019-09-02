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
    this._initCanvasEvent();
  };

  drawArea.prototype.drawAreaPosition = function(position) {
    this.drawObj.drawAreaPosition(position);
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
      //  根据绘画状态，清空存储数据
      that.drawObj.openDraw(e);
     /*  that.drawObj.setStartPoint(e.layerX, e.layerY); */
    };

    that.canvasObj.onmousemove = function(e) {
     /*  if (that.drawObj.drawing) { */
        that.drawObj.setMovePoint(e.layerX, e.layerY);
      /*   that.drawObj.drawGraph();
      } */
    };

    that.canvasObj.onmouseup = function(e) {
     /*  if (that.drawObj.drawing) { */
       /*  that.drawObj.setSavePoint(e.layerX, e.layerY);
        that.drawObj.drawGraph(); */
        that.drawObj.closeDraw(e);
    /*   } */
    };

    that.canvasObj.onmouseout = function(e) {
      
    }
  };

  drawArea.prototype.destoryEvent = function() {
    this.canvasObj.onmousedown = null;
    this.canvasObj.onmousemove = null;
    this.canvasObj.onmouseup = null;
  };
  return drawArea;
})();
