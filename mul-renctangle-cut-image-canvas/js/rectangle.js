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
    console.log('openDraw');
    const { layerX: sx, layerY: sy } = e;
    /* this.curPoints = null; */
    if (!this.isMultiple) {
      this.positions = [];
    }
    if (this.judgeStartIsClash(sx, sy)) {
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
      /*
      无法判断 矩形是否相交，该代码无效  
      if (this.judgeCurPointIsClash()) {
        this.drawing = false;
        return;
      } */
      this.keepRangeInClient();
      this.drawGraphs();
    }
  };

  //  设置结束位置
  rectangle.prototype.closeDraw = function(e) {
    this.moveDraw(e);
    this.drawing = false;
    if (this.curPoints) {
      let { sx, sy, mx, my } = this.curPoints;
      let isAreaZero = sx === mx || sy === my;
      if (!isAreaZero) {
        this.positions.push({ ...this.curPoints });
      }
      this.curPoints = null;
    }
  };

  rectangle.prototype.cancelDraw = function() {
    this.positions.pop();
    this.drawGraphs();
  };

  // 判断起点是否被包含在其他矩形
  rectangle.prototype.judgeStartIsClash = function(x, y) {
    const len = this.positions.length;
    for (let i = 0; i < len; i++) {
      let { sx, sy, mx, my } = this.positions[i];
      let xIsInRange = sx < x && x < mx;
      let yIsInRange = sy < y && y < my;
      //判断 x y 是否在已存在的区域内
      if (xIsInRange && yIsInRange) {
        return true;
      }
    }
    return false;
  };

  // 禁止矩形越界
  rectangle.prototype.keepRangeInClient = function() {
    let point = this.curPoints;
    let lineWidth = this.lineWidth;
    for (item in point) {
      if (point[item] < 0) {
        point[item] = lineWidth;
      }
      if (item.indexOf('x') > -1 && point[item] > this.clientW) {
        point[item] = this.clientW - lineWidth;
      }
      if (item.indexOf('y') > -1 && point[item] > this.clientH) {
        point[item] = this.clientH - lineWidth;
      }
    }
    this.curPoints = point;
  };

  // 判断矩形是否相交算法有问题，该代码无效
  rectangle.prototype.judgeCurPointIsClash = function() {
    this.keepRangeInClient();
    let { sx: cursx, sy: cursy, mx: curmx, my: curmy } = this.curPoints;
    const len = this.positions.length;
    let lineWidth = this.lineWidth;
    for (let i = 0; i < len; i++) {
      //已绘画矩形，包含绘制中的矩形
      let { sx, sy, mx, my } = this.positions[i];
      [sx, mx] = swap(sx, mx);
      [sy, my] = swap(sy, my);
      this.positions[i] = { sx, sy, mx, my };
      //两矩形右侧相交
      let cursxInPosition = sx < cursx && cursx < mx;
      //两矩形左侧相交
      let curmxInPosition = sx < curmx && curmx < mx;
      //两矩形下侧相交
      let cursyInPosition = sy < cursy && cursy < my;
      //两矩形上侧相交
      let curmyInPosition = sy < curmy && curmy < my;

      //绘画中矩形，已已绘画矩形
      //
      let posxInCur = cursx < sx && sx < curmx;
      let pomxInCur = cursx < mx && mx < curmx;
      let posyInCur = cursy < sy && sy < curmy;
      let pomyInCur = cursy < my && my < curmy;
      let leftTopUnion = curmxInPosition && curmyInPosition;
      let leftBottomUnion = curmxInPosition && cursyInPosition;
      let rightTopUnion = cursxInPosition && curmyInPosition;
      let rightBottomUnion = cursxInPosition && cursyInPosition;

      let postionStartInCur = posxInCur && posyInCur;
      let postionMoveInCur = pomxInCur && pomyInCur;

      //规范坐标点
      if (cursxInPosition || pomxInCur) {
        cursx = mx + lineWidth;
      }
      if (curmxInPosition || posxInCur) {
        curmx = sx - lineWidth;
      }
      if (cursyInPosition || pomyInCur) {
        cursy = my + lineWidth;
      }
      if (curmyInPosition || posyInCur) {
        curmy = sy - lineWidth;
      }
      //判断两矩形是否相交
      if (
        leftTopUnion ||
        leftBottomUnion ||
        rightTopUnion ||
        rightBottomUnion ||
        postionStartInCur ||
        postionMoveInCur
      ) {
        debugger;
        console.log({ sx, sy, mx, my });
        console.log({ cursx, cursy, curmx, curmy });
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

  rectangle.prototype.resetCanvasAndPsition = function() {
    this.position = [];
    this.clearCanvas();
  };

  return rectangle;
})();
