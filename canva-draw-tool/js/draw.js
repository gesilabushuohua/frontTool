/**
 * 绘画图形父类
 *
 */

const Draw = function() {
  //  构造类，初始化数据
  return class {
    constructor(context, w, h) {
      this.clientW = w;
      this.clientH = h;
      this.context = context;
      this.drawing = false;
      this.position = {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0
      };
    }
    //  开始绘画
    openDraw() {
      this.drawing = true;
    }

    //  结束绘画
    closeDraw() {
      this.drawing = false;
    }

    //  设置开始位置
    setStartPoint(startX, startY) {
      Object.assign(this.position, {
        startX: startX,
        startY: startY
      });
    }

    //  设置结束位置
    setEndPoint(moveX, moveY) {
      Object.assign(this.position, {
        moveX: moveX,
        moveY: moveY
      });
    }

    //  设置绘画样式
    setDrawStyle() {
      this.context.lineWidth = '4';
      this.context.fillStyle = '#0000ff';
      this.context.strokeStyle = 'green';
    }
    //  绘画图形
    draw() {}

    //  返回位置坐标
    getPosition() {}

    //  清理绘画区域
    clearCanvas() {
      this.context.clearRect(0, 0, this.clientW, this.clientH);
    }
  };
};
