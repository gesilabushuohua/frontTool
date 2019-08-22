const Polyline = (function() {
  //  构建子构造函数
  function polyline(context, w, h) {
    this.position = [];
    this.movePoint = null;
    this.closePolyline = false;
    Draw.call(this, context, w, h);
  }
  //  设置继承

  polyline.prototype = Object.create(Draw.prototype);
  polyline.prototype.constructor = polyline;

  /*  let prototype = Object.create(Draw.prototype);
  prototype.constructor = polyline;
  polyline.prototype = prototype; */

  //  设置开始位置
  polyline.prototype.setStartPoint = function(x, y) {};

  //  设置移动位置
  polyline.prototype.setMovePoint = function(x, y) {
    if (this.drawing) {
      this.movePoint = { x, y };
    }
  };

  polyline.prototype.setSavePoint = function(x, y) {
    if (this.drawing) {
      this.position.push({ x, y });
    }
  };

  polyline.prototype.drawAreaPosition = function(position) {
    if (position && position.length > 0) {
      this.position = position;
      this.drawing = true;
      this.drawGraph();
      this.context.fill();
      this.drawing = false;
    }
  };

  polyline.prototype.drawGraph = function() {
    let len = this.position.length;
    if (this.drawing && len > 0) {
      this.clearCanvas();
      this.setDrawStyle();
      this.context.beginPath();
      let { x: startX, y: startY } = this.position[0];
      this.context.moveTo(startX, startY);
      this.position.forEach(point => {
        let { x, y } = point;
        this.context.lineTo(x, y);
      });

      if (this.closePolyline) {
        this.context.lineTo(startX, startY);
      }

      if (this.movePoint) {
        let { x, y } = this.movePoint;
        this.context.lineTo(x, y);
      }

      this.context.stroke();
    }
  };

  // 判断节点是否结束,代码无效
  polyline.prototype.judgeIsEndPoint = function() {
    let len = this.position.length;
    if (len <= 0) {
      return;
    }
    let { x: sx, y: sy } = this.position[0];
    let { x: ex, y: ey } = this.position[len - 1];

    //  节点数大于3，点在5像素之内
    if (len >= 3 && (Math.abs(sx - ex) < 5 || Math.abs(sy - ey) < 5)) {
      this.movePoint = null;
      return true;
    }
    return false;
  };
  polyline.prototype.openDraw = function() {
    if (!this.drawing) {
      this.position = [];
    }
    this.drawing = true;
  };

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
