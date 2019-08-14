const Circle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function circle(context, w, h) {
    this.position = {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0
    };
    Draw.call(this, context, w, h);
  }
  //  设置继承
  circle.prototype = Draw.prototype;
  circle.prototype.constructor = circle;

  //  设置开始位置
  circle.prototype.setStartPoint = function(startX, startY) {
    Object.assign(this.position, {
      startX,
      startY
    });
  };

  //  设置结束位置
  circle.prototype.setMovePoint = function(moveX, moveY) {
    Object.assign(this.position, {
      moveX,
      moveY
    });
  };

  circle.prototype.drawGraph = function() {
    if (this.drawing) {
      let { startX, startY, moveX, moveY } = this.position;
      let x = compareMin(startX, moveX);
      let y = compareMin(startY, moveY);
      let diffX = Math.abs(startX - moveX);
      let diffY = Math.abs(startY - moveY);
      let r = Math.sqrt(diffX * diffX + diffY * diffY);
      r = this.judgScope(x, y, r);
      this.clearCanvas();
      this.setDrawStyle();
      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();
    }
  };

  circle.prototype.judgScope = function(x, y, r) {
    this.drawing = false;
    if (x - r < 0) {
      return x;
    }
    if (x + r > this.clientW) {
      return this.clientW - x;
    }
    if (y - r < 0) {
      return y;
    }
    if (y + r > this.clientH) {
      return this.clientH - y;
    }
    this.drawing = true;
    return r;
  };

  //  获取
  circle.prototype.getPosition = function(moveX, moveY) {
    return this.position;
  };

  return circle;
})();
