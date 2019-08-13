const Rectangle = (function() {
  let rectangle = function(canvasDom) {
    this.canvasDom = canvasDom;
    this.clientW = canvasDom.clientWidth;
    this.clientH = canvasDom.clientHeight;
    this.context = canvasDom.getContext("2d");
    this.drawing = false;
    this.position = {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0
    };
  };


  rectangle.prototype.setRectStyle = function() {
    this.context.lineWidth="4";  
    this.context.fillStyle = '#0000ff';
    this.context.strokeStyle = 'green';
  };

  rectangle.prototype.openDraw = function(startX, startY) {
    Object.assign(this.position, {
      startX: startX,
      startY: startY
    });
  };

  rectangle.prototype.moveDraw = function(moveX, moveY) {
    Object.assign(this.position, {
      moveX: moveX,
      moveY: moveY
    });
    this.draw();
  };

  rectangle.prototype.draw = function() {
    let { startX, startY, moveX, moveY } = this.position;
    let x = compareMin(startX, moveX);
    let y = compareMin(startY, moveY);
    let w = Math.abs(startX - moveX);
    let h = Math.abs(startY - moveY);
    this.clearCanvas();
    this.setRectStyle();
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);
  };

  rectangle.prototype.clearCanvas = function() {
    this.context.clearRect(0, 0, this.clientW, this.clientH);
  };

  rectangle.prototype.getPosition = function() {};

  function compareMin(a, b) {
    return a > b ? b : a;
  }

  return rectangle;
})();
