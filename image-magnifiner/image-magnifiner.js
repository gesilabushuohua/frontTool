/**
 图片放大镜
 
 参数
 imageContain 图片
 sliderContain 滑块容器
 showContain  展示容器
 magification 放大倍数
 sliderSize 滑块大小
 */
const ImageMagnifiner = (function() {
  function judgeRange(value, min, max) {
    let result = 0;
    if (value < min) {
      result = min;
    } else if (value > max) {
      result = max;
    } else {
      result = value;
    }
    return result;
  }

  function judgePolyPositonRange(left, top, parentDom, dom) {
    let { clientWidth: parentW, clientHeight: parentH } = parentDom;
    let { clientWidth: domW, clientHeight: domH } = dom;
    const minLfet = 0;
    const minTop = 0;
    const maxLfet = parentW - domW;
    const maxTop = parentH - domH;
    return {
      left: judgeRange(left, minLfet, maxLfet),
      top: judgeRange(top, minTop, maxTop)
    };
  }

  //默认参数
  const defaultMagification = 2;
  const defaultSliderSize = 50;
  const defaultShowSize = defaultSliderSize * defaultMagification;
  class Magifiner {
    constructor(imageContain, sliderContain, showContain) {
      this.imageContain = imageContain;
      this.sliderContain = sliderContain;
      this.showContain = showContain;
      this.magification = defaultMagification;
      this.sliderSize = defaultSliderSize;
      this.showSize = defaultShowSize;
      //滑块是否允许滑动
      this.isSliderMove = false;
      this.initSliderContainEvent();
      this.createSliderBox();
      this.createShowBox();
    }

    /* setMagifiner(magification) {
      this.magification = magification;
      this.showSize = this.magification*this.sliderSize;
    }

    setSliderSize(sliderSize) {
      this.sliderSize = sliderSize;
      this.showSize = this.magification*this.sliderSize;
    } */

    //滑块容器，添加鼠标移入、移出事件
    initSliderContainEvent() {
      //清空之前绑定
      this.destorySliderContainEvent();
      //移入事件，显示滑块、展示图片
      this.sliderContain.onmouseover = this.showSliderShowImage.bind(this);
      //移出事件，隐藏滑块，展示图片
      this.sliderContain.onmouseleave = this.hiddenSliderShowImage.bind(this);

      //解决 拖拽鼠标在滑块外，移动、松开事件
      let containParen = this.sliderContain.parentElement;
      //移动事件，移动滑块，切换图片展示区域
      containParen.onmousemove = this.sliderBoxMove.bind(this);
      document.onmouseup = this.sliderBoxMouseUp.bind(this);
    }

    //滑块容器，移除鼠标移入、移出事件
    destorySliderContainEvent() {
      this.sliderContain.onmouseover = null;
      this.sliderContain.onmouseleave = null;
      //解决 拖拽鼠标在滑块外，移动、松开事件
      let containParen = this.sliderContain.parentElement;
      containParen.onmousemove = null;
      document.onmouseup = null;
    }

    //创建滑块鼠标 点击、松开事件,点击注册
    initSliderBoxEvent() {
      this.destorySliderBoxEvent();
      this.sliderBox.onmousedown = this.sliderBoxMousedown.bind(this);
    }

    //销毁滑块鼠标 点击、移动、松开事件
    destorySliderBoxEvent() {
      this.sliderBox.onmousedown = null;
    }

    // 显示滑块，展示图片
    showSliderShowImage(e) {
      e.stopPropagation();
      let dom = e.target;
      let formDom = e.fromElement;
      let toDom = e.toElement;
      const isBoxToContain =
        formDom === this.sliderBox && toDom === this.sliderContain;
      const isContainToBox =
        formDom === this.sliderContain && toDom === this.sliderBox;

      //鼠标移动到滑块上，结束
      if (isBoxToContain || isContainToBox) {
        return;
      }

      //显示图片容器
      this.sliderBox.style.display = 'block';
      this.showBox.style.display = 'block';

      //添加滑块鼠标点击事件
      this.initSliderBoxEvent();
      //初始化滑块坐标，记录坐标起始位置，移动位置
      if (!this.sliderBoxPosition) {
        this.sliderBoxPosition = {
          sx: 0,
          sy: 0,
          mx: 0,
          my: 0
        };
      }
      //加载图片
      this.loadImage();
      //判断图片容器位置
      this.moveShowBoxToPosition();
      //显示滑块，起始位置位于左上角
      this.moveSliderBoxToPosition();
      //判断展示图片区域
      this.moveShowImageToPosition();
    }

    //隐藏滑块，展示图片
    hiddenSliderShowImage(e) {
      e.stopPropagation();
      //销毁滑块鼠标点击事件
      if (this.isSliderMove) {
        this.stopSlideBoxMove();
      }

      this.destorySliderBoxEvent();
      //隐藏滑块
      //隐藏展示容器
      //this.sliderBox.style.display = 'none';
      this.showBox.style.display = 'none';
    }

    //滑块鼠标压下事件，开始拖拽滑块
    sliderBoxMousedown(e) {
      e.stopPropagation();
      e.preventDefault();
      // 设置起始位置，初始化移动位置
      let mx = 0,
        my = 0;
      Object.assign(this.sliderBoxPosition, { mx, my });
      this.isSliderMove = true;
    }

    //滑块鼠标松开事件，结束拖拽滑块
    sliderBoxMouseUp(e) {
      this.stopSlideBoxMove();
    }

    stopSlideBoxMove() {
      let { sx, sy, mx, my } = this.sliderBoxPosition;
      sx = sx + mx;
      sy = sy + my;
      mx = 0;
      my = 0;
      Object.assign(this.sliderBoxPosition, { sx, sy, mx, my });
      this.isSliderMove = false;
    }

    //滑块容器鼠标移动事件，滑块在容器内滑动
    sliderBoxMove(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.isSliderMove) {
        let { movementX, movementY } = e;
        let { mx, my } = this.sliderBoxPosition;
        mx = mx + movementX;
        my = my + movementY;
        Object.assign(this.sliderBoxPosition, { mx, my });
        //根据滑动距离，判断滑块移动后位置，mousedomn position
        this.moveSliderBoxToPosition();
        //根据滑动距离，判断展示细节图片局部位置
        this.moveShowImageToPosition();
      }
    }

    loadImage() {
      if (this.showImage.src === this.imageContain.src) {
        return;
      }
      this.sliderBoxPosition = {
        sx: 0,
        sy: 0,
        mx: 0,
        my: 0
      };
      this.showImage.src = this.imageContain.src;
      const { clientWidth, clientHeight } = this.imageContain;
      let sw = clientWidth * this.magification;
      let sh = clientHeight * this.magification;
      this.showImage.style = `position:absolute;width:${sw}px;height:${sh}px`;
    }

    moveSliderBoxToPosition() {
      let { sx, sy, mx, my } = this.sliderBoxPosition;
      let diffX = sx + mx;
      let diffY = sy + my;
      let { left, top } = judgePolyPositonRange(
        diffX,
        diffY,
        this.sliderContain,
        this.sliderBox
      );
      this.sliderBox.style.left = `${left}px`;
      this.sliderBox.style.top = `${top}px`;
    }

    moveShowImageToPosition() {
      let { sx, sy, mx, my } = this.sliderBoxPosition;
      let { offsetLeft: pLeft, offsetTop: pTop } = this.sliderContain;

      let sLeft = (pLeft + sx + mx) * this.magification;
      let sTop = (pTop + sy + my) * this.magification;
      let { left, top } = judgePolyPositonRange(
        sLeft,
        sTop,
        this.showImage,
        this.showBox
      );
      this.showImage.style.left = `${-left}px`;
      this.showImage.style.top = `${-top}px`;
    }

    moveShowBoxToPosition() {
      //判断展示图片位置
      let x = 0,
        y = 0;
      const domW = this.showSize;
      const domH = this.showSize;
      const { offsetWidth: parentW, offsetHeight: parentH } = this.imageContain;
      const {
        offsetLeft: sliderL,
        offsetTop: sliderT,
        offsetWidth: sliderW,
        offsetHeight: sliderH
      } = this.sliderContain;
      // 展示容器 d shoxBox、展示容器父级 showContain p、待放大区域 s sliderContain,（禁止放置区域暂定，检索对比图）
      // 右侧   sl + sw + dw < pw  left = pw - dw
      const right = sliderL + sliderW + domW < parentW;
      // 左侧   dw < sl  left = 0
      // 不满足 left = pw
      const left = domW < sliderL;
      // 上下侧区域条件
      // 下侧  st + sh + dh < ph  top = ph - dh
      const bottom = sliderT + sliderH + domH < parentH;
      // 上侧  dh < st  top = 0
      // 不满足 top = -dh
      const top = domH < sliderT;
      if (right) {
        x = parentW - domW;
      } else if (left) {
        x = 0;
      } else {
        x = parentW;
      }

      if (bottom) {
        y = parentH - domH;
      } else if (top) {
        y = 0;
      } else {
        y = -domH;
      }
      this.showBox.style.left = `${x}px`;
      this.showBox.style.top = `${y}px`;
    }

    //创建滑块
    createSliderBox() {
      let sliderBox = document.createElement('DIV');
      sliderBox.style.width = `${this.sliderSize}px`;
      sliderBox.style.height = `${this.sliderSize}px`;
      sliderBox.classList = 'slider-box';
      this.sliderContain.appendChild(sliderBox);
      //sliderBox.style.display = 'none';
      this.sliderBox = sliderBox;
    }

    //创建展示框
    createShowBox() {
      let showBox = document.createElement('DIV');
      showBox.style.width = `${this.showSize}px`;
      showBox.style.height = `${this.showSize}px`;
      showBox.classList = 'show-box';
      let showImage = document.createElement('IMG');
      showBox.appendChild(showImage);
      this.showContain.appendChild(showBox);
      this.showImage = showImage;
      showBox.style.display = 'none';
      this.showBox = showBox;
    }
  }

  return Magifiner;
})();
