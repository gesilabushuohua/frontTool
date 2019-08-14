/**
 * 调用绘画对象
 * 生成 canvas 画板
 * 初始化 绘画事件
 *
 */

const DrawArea = function() {
  function createCanvas(contain, w, h) {
    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    contain.appendChild(canvas);
    return canvas;
  }

  function initCanvasEvent(canvasObj, drawObj) {
    let that = this;
    canvasObj.onmousedown = function(e) {
      that.drawing = true;
      drawObj.openDraw(e.layerX, e.layerY);
    };

    canvasObj.onmousemove = function(e) {
      if (that.drawing) {
        drawObj.moveDraw(e.layerX, e.layerY);
      }
    };

    canvasObj.onmouseup = function(e) {
      if (that.drawing) {
        drawObj.moveDraw(e.layerX, e.layerY);
      }
      that.drawing = false;
    };
  }
};
