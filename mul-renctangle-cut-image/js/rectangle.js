const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function rectangle(context, w, h) {
    Draw.call(this, context, w, h);
    // 标记是否只绘画多个图形,默认只绘画一个
    this.isMultiple = false;
    // 保存矩形  坐标，判断点是否冲突，数据输出
    this.positions = [];
    
    // 保存当前矩形数据
    this.curPoints = null;
    //记录最后保存值
    this.lastIndex = -1;
  }

  //  创建对象副本，修改属性，不影响父级
  rectangle.prototype = Object.create(Draw.prototype);
  rectangle.prototype.constructor = rectangle;

  //  设置开始绘画
  rectangle.prototype.openDraw = function(e) {
    let { layerX: sx, layerY: sy } = e;
    if (!this.isMultiple) {
      this.positions = [];
    } else {
      this.lastIndex++;
    }
    this;
    this.drawing = true;
  };


  //  设置结束位置
  rectangle.prototype.setMovePoint = function(e) {
    let { layerX: mx, layerY: my } = e;
  };

  //  设置结束位置
  rectangle.prototype.setEndPoint = function(e) {
    let { layerX: mx, layerY: my } = e;
  };

  rectangle.prototype.closeDraw = function() {
    this.drawing = false;
  };

  rectangle.prototype.drawAreaPosition = function(positions) {
    this.positions = positions;
    this.drawGraph();
  };

  rectangle.prototype.drawGraph = function() {
    if (this.drawing) {
      let { sx, sy, mx, my } = this.position;
      let x = compareMin(sx, mx);
      let y = compareMin(sy, my);
      let w = Math.abs(sx - mx);
      let h = Math.abs(sy - my);
      this.clearCanvas();
      this.setDrawStyle();
      this.context.fillRect(x, y, w, h);
      this.context.strokeRect(x, y, w, h);
    }
  };

  //  获取
  rectangle.prototype.getPosition = function(mx, my) {
    return this.position;
  };

  return rectangle;
})();
