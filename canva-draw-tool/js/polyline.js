const Polyline = (function() {
  //  构建子构造函数
  function polyline(context, w, h) {
    this.position = [];
    Draw.call(this, context, w, h);
  }
  //  设置继承
  polyline.prototype = Draw.prototype;
  polyline.prototype.constructor = polyline;

  //  设置开始位置
  polyline.prototype.setStartPoint = function(x, y) {
    if (!this.drawing) {
      this.position = [];
    }
    this.position.push({ x, y });
  };

  //  设置移动位置
  polyline.prototype.setMovePoint = function(x, y) {
    if (this.drawing) {
      if (this.position.length >= 2) {
        this.position.pop();
      }
      this.position.push({ x, y });
    }
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
      this.context.stroke();
    }
  };

  // 判断节点是否结束
  polyline.prototype.judgeIsEndPoint = function() {
    let  len  = this.position.length;
    let { x: sx, y: sy } = this.position[0];
    let { x: ex, y: ey } = this.position[len - 1];

    //  节点数大于3，点在5像素之内
    if (len >= 3 && (Math.abs(sx - ex) < 5 || Math.abs(sy - ey) < 5)) {
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
  polyline.prototype.getPosition = function(moveX, moveY) {
    return this.position;
  };

  return polyline;
})();
