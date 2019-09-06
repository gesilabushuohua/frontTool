/**
 * 调用绘画对象
 * 生成 canvas 画板
 * 初始化 绘画事件
 *
 */

const DrawArea = (function() {
  function _createCanvas(contain, w, h) {
    let canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.style = 'position:absolute;z-index:10;';
    console.log([contain]);
    contain.appendChild(canvas);
    return canvas;
  }

  let drawArea = function(contain, w, h) {
    console.log('drawArea', [contain]);
    this.contain = contain;
    this.canvasObj = _createCanvas(contain, w, h);
    this.context = this.canvasObj.getContext('2d');
    this.drawObj = new Rectangle(this.context, w, h);
    this._initCanvasEvent();
  };

  drawArea.prototype.upSize = function(w, h) {
    this.canvasObj.width = w;
    this.canvasObj.height = h;
  };

  drawArea.prototype.setMultiple = function() {
    this.drawObj.setMultiple();
    // 绘画多个矩形，显示确认框
    this.hasComfirm = true;
    this.createComfirmBox();
    this.initComfirmBoxClick();
  };

  drawArea.prototype.setCompleteFnc = function(completeFnc) {
    this.hasComplete = true;
    this.completeFnc = completeFnc;
  };

  drawArea.prototype.drawAreaByPosition = function(position) {
    this.drawObj.drawAreaByPosition(position);
  };

  drawArea.prototype.getCanvasObj = function() {
    return this.canvasObj;
  };

  drawArea.prototype.resetCanvasAndPsition = function() {
    this.drawObj.resetCanvasAndPsition();
  };

  drawArea.prototype.getPosition = function() {
    return this.drawObj.getPosition();
  };

  drawArea.prototype.createComfirmBox = function() {
    if (this.comfirmBox) {
      return;
    }
    let comfirmBox = document.createElement('DIV');
    comfirmBox.classList = 'tool';
    comfirmBox.style.display = 'none';
    let rightBtn = document.createElement('DIV');
    rightBtn.classList = 'right';
    let errBtn = document.createElement('DIV');
    errBtn.classList = 'err';
    comfirmBox.appendChild(rightBtn);
    comfirmBox.appendChild(errBtn);
    this.contain.appendChild(comfirmBox);
    this.comfirmBox = comfirmBox;
    this.rightBtn = rightBtn;
    this.errBtn = errBtn;
    //初始化数据
    this.isHandleComfirm = true;
  };

  drawArea.prototype.initComfirmBoxClick = function() {
    let that = this;
    this.rightBtn.onclick = function(e) {
      e.stopPropagation();
      if (that.hasComplete) {
        //标记是否操作过
        that.isHandleComfirm = true;
        console.log('rightBtn', that.positions);
        let positions = [...that.positions];
        that.completeFnc(positions);
        that.hiddenComfirmBox();
      }
    };
    this.errBtn.onclick = function(e) {
      e.stopPropagation();
      //标记是否操作过
      that.isHandleComfirm = true;
      that.drawObj.cancelDraw();
      that.hiddenComfirmBox();
    };
  };

  drawArea.prototype.moveComfirmBox = function(left, top) {
    this.comfirmBox.style = `display:block;left:${left}px;top:${top}px;`;
    //展示确认框，没有确认
    this.isHandleComfirm = false;
  };

  drawArea.prototype.hiddenComfirmBox = function() {
    this.comfirmBox.style = `display:none;`;
  };

  drawArea.prototype._initCanvasEvent = function() {
    let that = this;
    that.canvasObj.onmousedown = function(e) {
      e.stopPropagation();
      e.preventDefault();
      // 判断是否有选择，并且操作过
      if (that.hasComfirm && !that.isHandleComfirm) {
        return;
      }
      that.drawObj.openDraw(e);
    };

    that.canvasObj.onmousemove = function(e) {
      e.stopPropagation();
      e.preventDefault();
      that.drawObj.moveDraw(e);
    };

    that.canvasObj.onmouseup = function(e) {
      console.log('onmouseup');
      e.stopPropagation();
      e.preventDefault();
      that.closeDrawArea(e);
    };

    that.canvasObj.onmouseout = function(e) {
      console.log('onmouseout');
      e.stopPropagation();
      that.closeDrawArea(e);
    };
  };

  drawArea.prototype.closeDrawArea = function(e) {
    this.drawObj.closeDraw(e);
    if (this.hasComplete) {
      let positions = this.drawObj.getPosition();
      let len = positions.length;
      // 有确认框，已经操作过，数据有效

      // 操作完成不在显示？？？
      console.log('this.isHandleComfirm', this.isHandleComfirm);
      if (this.hasComfirm && len > 0) {
        let { sy, mx } = positions[len - 1];
        this.positions = positions;
        this.moveComfirmBox(mx, sy);
      } else if (len > 0) {
        this.completeFnc(positions);
      }
    }
  };

  drawArea.prototype.destoryEvent = function() {
    this.canvasObj.onmousedown = null;
    this.canvasObj.onmousemove = null;
    this.canvasObj.onmouseup = null;
    this.canvasObj.onmouseout = null;
  };

  return drawArea;
})();
