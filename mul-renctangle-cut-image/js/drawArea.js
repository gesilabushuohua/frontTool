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
<<<<<<< HEAD
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

=======
    this.drawObj = new Rectangle(context, w, h);
    this.drawObj.setMultiple();
    this._initCanvasEvent();
  };

>>>>>>> 87b76a74a8bc91bd7685ec2ea88719575efddff1
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
<<<<<<< HEAD
      /* if (that.type !== 'polyline') {
        that.drawObj.setStartPoint(e.layerX, e.layerY);
      } */
    };

    that.canvasObj.onmousemove = function(e) {
      that.drawObj.movedraw(e);
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
=======
    };

    that.canvasObj.onmousemove = function(e) {
        that.drawObj.moveDraw(e);
    };

    that.canvasObj.onmouseup = function(e) {
        that.drawObj.closeDraw(e);
>>>>>>> 87b76a74a8bc91bd7685ec2ea88719575efddff1
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
