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

  /*  let prototype = Object.create(Draw.prototype);
  prototype.constructor = polyline;
  polyline.prototype = prototype; */

  //  设置开始位置
  polyline.prototype.setStartPoint = function(x, y) {
    if (!this.drawing) {
      this.position = [{ x, y }];
    }
  };

  //  设置移动位置
  polyline.prototype.setMovePoint = function(x, y) {
    if (this.drawing) {
      this.movePoint = { x, y };
    }
  };

  polyline.prototype.setSavePoint = function(x, y) {
    if (this.drawing) {
      console.log('setSavePoint', { x, y });
      this.position.push({ x, y });
    }
  };

  polyline.prototype.drawAreaPosition = function(position) {
    this.position = position;
    this.drawGraph();
  };

  polyline.prototype.drawGraph = function() {
    if (this.drawing) {
      this.clearCanvas();
      this.setDrawStyle();
      this.context.beginPath();
      let { x: startX, y: startY } = this.position[0];
      this.context.moveTo(startX, startY);
      for (let i = 1; i < this.position.length; i++) {
        let { x, y } = this.position[i];
        this.context.lineTo(x, y);
      }
      if (this.movePoint) {
        let { x, y } = this.movePoint;
        this.context.lineTo(x, y);
      }
      this.context.stroke();
    }
  };

  // 判断节点是否结束
  polyline.prototype.judgeIsEndPoint = function() {
    let len = this.position.length;
    let { x: sx, y: sy } = this.position[0];
    let { x: ex, y: ey } = this.position[len - 1];

    //  节点数大于3，点在5像素之内
    if (len >= 3 && (Math.abs(sx - ex) < 5 || Math.abs(sy - ey) < 5)) {
      this.movePoint = null;
      console.log(this.position);
      return true;
    }
    return false;
  };

  polyline.prototype.closeDraw = function() {
    if (this.judgeIsEndPoint()) {
      this.context.fill();
      this.drawing = false;
    }
  };

  //  获取
  polyline.prototype.getPosition = function() {
    return this.position;
  };

  return polyline;
})();
