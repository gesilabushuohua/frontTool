const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function rectangle(context, w, h) {
    Draw.call(this, context, w, h);
    this.position = {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0
    };
  }
  //  设置继承
  /* 
  直接使用 Draw 属性，修改Draw属性，继承子类覆盖之前所有属性
  rectangle.prototype = Draw.prototype;
  rectangle.prototype.constructor = rectangle;
 */

  //  创建对象副本，修改属性，不影响父级
  rectangle.prototype = Object.create(Draw.prototype);
  rectangle.prototype.constructor = rectangle;

  //  设置开始位置
  rectangle.prototype.setStartPoint = function(startX, startY) {
    if (!this.drawing) {
      this.position = {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0
      };
    }
    Object.assign(this.position, {
      startX,
      startY
    });
  };

  //  设置结束位置
  rectangle.prototype.setMovePoint = function(moveX, moveY) {
    Object.assign(this.position, {
      moveX,
      moveY
    });
  };

  //  设置结束位置
  rectangle.prototype.setSavePoint = function(moveX, moveY) {
    Object.assign(this.position, {
      moveX,
      moveY
    });
  };

  rectangle.prototype.drawAreaPosition = function(position) {
    this.position = position;
    this.drawGraph();
  };

  rectangle.prototype.drawGraph = function() {
    if (this.drawing) {
      let { startX, startY, moveX, moveY } = this.position;
      let x = compareMin(startX, moveX);
      let y = compareMin(startY, moveY);
      let w = Math.abs(startX - moveX);
      let h = Math.abs(startY - moveY);
      this.clearCanvas();
      this.setDrawStyle();
      this.context.fillRect(x, y, w, h);
      this.context.strokeRect(x, y, w, h);
    }
  };

  //  获取
  rectangle.prototype.getPosition = function(moveX, moveY) {
    return this.position;
  };

  return rectangle;
})();
