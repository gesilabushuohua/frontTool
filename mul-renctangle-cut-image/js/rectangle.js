const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  function swap(a, b) {
    if (a > b) {
      let temp = a;
      a = b;
      b = temp;
    }
    return [a, b];
  }

  //  构建子构造函数
  function rectangle(context, w, h) {
    Draw.call(this, context, w, h);
    // 标记是否只绘画多个图形,默认只绘画一个
    this.isMultiple = false;
    // 保存矩形坐标
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
    const { layerX: sx, layerY: sy } = e;
    if (!this.isMultiple) {
      this.positions = [];
    } else {
      this.lastIndex++;
    }
    console.log('openDraw');
    if (this.judgeStartIsClash(sx, sy)) {
      console.log("起点不合适");
      return;
    }
    this.curPoints = { sx, sy };
    this.drawing = true;
  };

  //  移动绘画
  rectangle.prototype.moveDraw = function(e) {
    if (this.drawing) {
      let { layerX: mx, layerY: my } = e;
      Object.assign(this.curPoints, { mx, my });
      // 比较两个坐标点，把较小的点作为起点，便于判断矩形之间是否存在冲突
      let { sx, sy } = this.curPoints;
      [sx, mx] = swap(sx, mx);
      [sy, my] = swap(sy, my);
      this.curPoints = { sx, sy, mx, my };
      console.log('moveDraw');
      if (this.judgePointIsClash(this.curPoints)) {
        console.log("移动点不合适");
        this.drawing = false;
        return;
      }
      this.drawGraphs();
    }
  };

  //  设置结束位置
  rectangle.prototype.closeDraw = function(e) {
    this.moveDraw(e);
    if(this.curPoints){
      this.positions.push(this.curPoints);
      this.curPoints = null;
    }
    this.drawing = false;
  };

  // 判断起点是否被包含在其他矩形
  rectangle.prototype.judgeStartIsClash = function(x, y) {
    const len = this.positions.length;
    for (let i = 0; i < len; i++) {
      console.log(i,this.positions,this.positions[i]);
      let { sx, sy, mx, my } = this.positions[i];
      console.log({ sx, sy, mx, my });
      console.log({ x,y });
      let xIsInRange = sx < x && x < mx;
      let yIsInRange = sy < y && y < my;
      //判断 x y 是否在已存在的区域内
      if (xIsInRange && yIsInRange) {
        return true;
      }
    }
    return false;
  };

  rectangle.prototype.judgePointIsClash = function(point) {
    let { sx: osx, sy: osy, mx: omx, my: omy } = point;
    const len = this.positions.length;
    for (let i = 0; i < len; i++) {
      // 该点是否被包含
      let { sx, sy, mx, my } = this.positions[i];
    /*   console.log({ sx, sy, mx, my });
      console.log({ osx, osy, omx, omy });
      console.log(
        osx < sx < omx,
        osx < mx < omx,
        osy < sy < omy,
        osy < my < omy
      ); */
      let xIsInRange = (osx < sx && sx < omx) || (osx < mx && mx < omx);
      let yIsInRange = (osy < sy && sy < omy) || (osy < my && my < omy);
     /*  console.log(
        xIsInRange,
        yIsInRange
      ); */
      //判断 绘画区域是否包含，在已存在的区域内
      if (xIsInRange && yIsInRange) {
        return true;
      }
    }
    return false;
  };

  rectangle.prototype.setMultiple = function() {
    this.isMultiple = true;
  };

  rectangle.prototype.setcloseDrawing = function() {
    this.drawing = false;
  };

  rectangle.prototype.drawAreaByPosition = function(positions) {
    this.positions = positions;
    this.curPoints = null;
    this.drawGraphs();
  };

  rectangle.prototype.drawGraphs = function() {
    this.clearCanvas();
    this.positions.forEach(point => {
      this.drawGraph(point);
    });
    if (this.curPoints) {
      this.drawGraph(this.curPoints);
    }
  };

  rectangle.prototype.drawGraph = function(point) {
    let { sx, sy, mx, my } = point;
    /* 
    let x = sx; 
      let y = sy;
    存在问题，后期调,查看问题关键
    // 已保存的数据，已排序，无需再比较
    if(point === this.curPoints){
      x = compareMin(sx, mx);
      y = compareMin(sy, my);
    } */

    let x = compareMin(sx, mx);
    let y = compareMin(sy, my);
    let w = Math.abs(sx - mx);
    let h = Math.abs(sy - my);
    this.setDrawStyle();
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);
  };

  //  获取
  rectangle.prototype.getPosition = function() {
    return this.positions;
  };

  return rectangle;
})();
