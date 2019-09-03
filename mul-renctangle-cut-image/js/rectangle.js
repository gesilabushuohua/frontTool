const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function rectangle(context, w, h) {
    Draw.call(this, context, w, h);
    this.position = {
      sx: 0,
      xy: 0,
      mx: 0,
      my: 0
    };
  }

  //  创建对象副本，修改属性，不影响父级
  rectangle.prototype = Object.create(Draw.prototype);
  rectangle.prototype.constructor = rectangle;

  // 开始绘画
  rectangle.prototype.openDraw = function(e) {
    const { layerX: sx, layerY: sy } = e;
    Object.assign(this.position, { sx, sy });
    this.drawing = true;
  };
  // 绘画过程数据
  rectangle.prototype.movedraw = function(e) {
    if (this.drawing) {
      const { layerX: mx, layerY: my } = e;
      Object.assign(this.position, { mx, my });
      this.drawGraph();
    }
  };
  // 结束绘画
  rectangle.prototype.closedraw = function(e) {
    this.movedraw(e);
    this.drawing = false;
  };

  // 根据绘画坐标绘画图形
  rectangle.prototype.drawGraph = function() {
    let { sx, sy, mx, my } = this.position;
    let x = compareMin(sx, mx);
    let y = compareMin(sy, my);
    let w = Math.abs(sx - mx);
    let h = Math.abs(sy - my);
    this.clearCanvas();
    this.setDrawStyle();
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);
  };

  // 根据传入参数绘画图形
  rectangle.prototype.drawAreaByPosition = function(param) {
    this.position = param;
    this.drawGraph();
  };

  // 清除绘画及数据
  rectangle.prototype.resetCanvasAndPsition = function() {
    this.position = {
      sx: 0,
      xy: 0,
      mx: 0,
      my: 0
    };
    this.clearCanvas();
  };

  // 获取绘画数据
  rectangle.prototype.getPosition = function() {
    return this.position;
  };

  return rectangle;
})();
