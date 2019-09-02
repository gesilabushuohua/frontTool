const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  构建子构造函数
  function rectangle(context, w, h) {
    Draw.call(this, context, w, h);
    // 标记是否只绘画多个图形,默认只绘画一个
    this.isMultiple = false;
    this.position = {
      sx: 0,
      sy: 0,
      mx: 0,
      my: 0
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

  //  设置开始绘画
  rectangle.prototype.openDraw = function() {
    if (!this.drawing) {
      this.position = {
        sx: 0,
        sy: 0,
        mx: 0,
        my: 0
      };
    }
    this.drawing = true;
  };
  //  设置开始位置
  rectangle.prototype.setStartPoint = function(sx, sy) {
    Object.assign(this.position, {
      sx,
      sy
    });
  };

  //  设置结束位置
  rectangle.prototype.setMovePoint = function(mx, my) {
    Object.assign(this.position, {
      mx,
      my
    });
  };

  //  设置结束位置
  rectangle.prototype.setSavePoint = function(mx, my) {
    Object.assign(this.position, {
      mx,
      my
    });
  };

  rectangle.prototype.drawAreaPosition = function(position) {
    this.position = position;
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
