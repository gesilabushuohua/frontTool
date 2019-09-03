const Circle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function circle(context, w, h) {
    this.position = {
      sx: 0,
      sy: 0,
      mx: 0,
      my: 0
    };
    Draw.call(this, context, w, h);
  }
  //  设置继承
  circle.prototype = Object.create(Draw.prototype);
  circle.prototype.constructor = circle;

  // 开始绘画
  circle.prototype.openDraw = function(e) {
    const { layerX: sx, layerY: sy } = e;
    Object.assign(this.position, { sx, sy });
    this.drawing = true;
  };
  // 绘画过程数据
  circle.prototype.movedraw = function(e) {
    if (this.drawing) {
      const { layerX: mx, layerY: my } = e;
      Object.assign(this.position, { mx, my });
      this.drawGraph();
    }
  };

  // 结束绘画
  circle.prototype.closedraw = function(e) {
    this.movedraw(e);
    this.drawing = false;
  };

  // 根据绘画坐标绘画图形
  circle.prototype.drawGraph = function() {
    let { sx, sy, mx, my } = this.position;
    let x = compareMin(sx, mx);
    let y = compareMin(sy, my);
    let diffX = Math.abs(sx - mx);
    let diffY = Math.abs(sy - sy);
    let r = Math.sqrt(diffX * diffX + diffY * diffY);
    r = this.judgScope(x, y, r);
    this.clearCanvas();
    this.setDrawStyle();
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  };

  // 根据传入参数绘画图形
  circle.prototype.drawAreaByPosition = function(param) {
    this.position = param;
    this.drawGraph();
  };

  // 清除绘画及数据
  circle.prototype.resetCanvasAndPsition = function() {
    this.position = {
      sx: 0,
      xy: 0,
      mx: 0,
      my: 0
    };
    this.clearCanvas();
  };

  // 获取绘画数据
  circle.prototype.getPosition = function() {
    return this.position;
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

  return circle;
})();
