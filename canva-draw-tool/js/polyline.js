const Polyline = (function() {
  //  构建子构造函数
  function polyline(context, w, h) {
    this.position = [];
    this.movePoint = null;
    Draw.call(this, context, w, h);
  }

  //  设置继承
  polyline.prototype = Object.create(Draw.prototype);
  polyline.prototype.constructor = polyline;

  // 开始绘画,及绘画下一点,判断是否结束绘画
  polyline.prototype.openDraw = function(e) {
    const { layerX: x, layerY: y } = e;
    if (!this.drawing) {
      this.position = [{ x, y }];
      this.drawing = true;
    } else {
      this.position.push({ x, y });
      this.drawGraph();
      this.closeDraw();
    }
  };

  // 绘画过程数据
  polyline.prototype.movedraw = function(e) {
    if (this.drawing) {
      const { layerX: x, layerY: y } = e;
      this.movePoint = { x, y };
      this.drawGraph();
    }
  };

  // 根据绘画坐标绘画图形
  polyline.prototype.drawGraph = function() {
    let len = this.position.length;
    if (this.drawing && len > 0) {
      this.clearCanvas();
      this.setDrawStyle();
      this.context.beginPath();
      let [{ x: sx, y: sy }] = this.position;
      this.context.moveTo(sx, sy);
      this.position.forEach(point => {
        let { x, y } = point;
        this.context.lineTo(x, y);
      });

      if (this.closePolyline) {
        this.context.lineTo(sx, sy);
      }

      if (this.movePoint) {
        let { x, y } = this.movePoint;
        this.context.lineTo(x, y);
      }

      this.context.stroke();
    }
  };

  // 根据传入参数绘画图形
  polyline.prototype.drawAreaByPosition = function(param) {
    if (param && param.length > 0) {
      this.position = param;
      this.closePolyline = true;
      this.drawGraph();
      this.context.fill();
      this.closePolyline = false;
    }
  };

  // 清除绘画及数据
  polyline.prototype.resetCanvasAndPsition = function() {
    this.position = {
      sx: 0,
      xy: 0,
      mx: 0,
      my: 0
    };
    this.clearCanvas();
  };

  // 判断节点是否结束
  polyline.prototype.judgeIsEndPoint = function() {
    let len = this.position.length;
    let [{ x: sx, y: sy }] = this.position;
    let { x: ex, y: ey } = this.position[len - 1];

    //  节点数大于3，点在5像素之内
    if (len >= 3 && Math.abs(sx - ex) <= 10 && Math.abs(sy - ey) <= 10) {
      this.movePoint = null;
      return true;
    }
    return false;
  };

  //将最后一点和第一点首尾相连，规范最后线段
  polyline.prototype.drawCloseLine = function() {
    this.position.pop();
    this.closePolyline = true;
    this.drawGraph();
    this.context.fill();
    this.closePolyline = false;
  };

  polyline.prototype.closeDraw = function() {
    //  判断节点是否是终点，是 结束 ，不是 继续
    let isEndPoint = this.judgeIsEndPoint();
    if (isEndPoint) {
      this.drawCloseLine();
    }
    this.drawing = !isEndPoint;
  };

  //  获取
  polyline.prototype.getPosition = function() {
    return this.position;
  };

  return polyline;
})();
