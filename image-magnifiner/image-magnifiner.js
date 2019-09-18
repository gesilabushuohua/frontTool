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
  //默认参数
  const defaultMagification = 4;
  const defaultSliderSize = 60;
  const defaultShowSize = defaultSliderSize * defaultMagification;
  class Magifiner {
    constructor(contain, imageTagName) {
      this.contain = contain;
      contain.style.position = 'relative';
      this.imageTagName = imageTagName;
      this.magification = defaultMagification;
      this.sliderSize = defaultSliderSize;
      this.showSize = defaultShowSize;
      this.initSliderContainEvent();
      this.createSliderBox();
      this.createShowBox();

      this.setInnerMoveType();
    }

    /* setMagifiner(magification) {
      this.magification = magification;
      this.showSize = this.magification*this.sliderSize;
    }

    setSliderSize(sliderSize) {
      this.sliderSize = sliderSize;
      this.showSize = this.magification*this.sliderSize;
    } */

    setInnerMoveType() {
      this.moveObj = new MoveInnerPositioon(
        this.contain,
        this.sliderBox,
        this.showBox
      );
    }

    setNextMoveType() {
      this.moveObj = new MoveToNextPositioon(
        this.contain,
        this.sliderBox,
        this.showBox
      );
    }

    //滑块容器，添加鼠标移入、移出事件
    initSliderContainEvent() {
      //清空之前绑定
      this.destorySliderContainEvent();
      //移入事件，显示滑块、展示图片
      this.contain.onmouseover = this.containBoxMouseOver.bind(this);
      //移出事件，隐藏滑块，展示图片
      this.contain.onmouseleave = this.hiddenSliderShowImage.bind(this);
    }

    //滑块容器，移除鼠标移入、移出事件
    destorySliderContainEvent() {
      this.contain.onmouseover = null;
      this.contain.onmouseleave = null;
    }

    //创建滑块鼠标 滑动事件
    initSliderBoxEvent() {
      this.destorySliderBoxEvent();
      this.contain.onmousemove = this.sliderBoxMove.bind(this);
    }

    //销毁滑块鼠标 点击、移动、松开事件
    destorySliderBoxEvent() {
      //滑块移动事件
      this.contain.onmousemove = null;
    }

    containBoxMouseOver(e) {
      e.stopPropagation();
      let dom = e.target;
      let toElement = e.toElement;
      // 特殊标签，针对当前情况
      let special = document.getElementById('carFrame');
      if (dom.className.indexOf(this.imageTagName) > -1) {
        this.imageContain = dom;
        if (this.moveObj.setImageContain) {
          //移动到相邻位置，设置图片位置信息
          this.moveObj.setImageContain(dom);
        }
        //加载图片
        this.loadImage();
        this.showSliderShowImage(e);
      } else if (
        toElement !== this.sliderBox &&
        toElement !== this.showBox &&
        toElement !== this.showImage
      ) {
        if (toElement === special) {
          return;
        }
        this.hiddenSliderShowImage(e);
      }
    }

    // 显示滑块，展示图片
    showSliderShowImage(e) {
      e.stopPropagation();
      //显示图片容器
      this.sliderBox.style.display = 'block';
      this.showBox.style.display = 'block';
      //初始化滑块坐标，记录坐标起始位置，移动位置
      if (!this.sliderBoxPosition) {
        this.sliderBoxPosition = {
          sx: 0,
          sy: 0,
          mx: 0,
          my: 0
        };
      }

      // 设置起始位置，初始化移动位置
      let { offsetX: sx, offsetY: sy } = e;
      Object.assign(this.sliderBoxPosition, { sx, sy, mx: 0, my: 0 });
      //添加滑块鼠标点击事件
      this.initSliderBoxEvent();

      //移动滑块位置
      let { left, top } = this.moveObj.moveSliderBoxToPosition({
        ...this.sliderBoxPosition
      });
      //判断展示图片区域
      this.moveObj.moveShowBoxToPosition();
      this.moveShowImageToPosition(left, top);
    }

    //隐藏滑块，展示图片
    hiddenSliderShowImage(e) {
      e.stopPropagation();
      //销毁滑块鼠标点击事件
      this.stopSlideBoxMove();
      this.destorySliderBoxEvent();
      //隐藏滑块
      //隐藏展示容器
      this.sliderBox.style.display = 'none';
      this.showBox.style.display = 'none';
    }

    stopSlideBoxMove() {
      if (!this.sliderBoxPosition) {
        this.sliderBoxPosition = { sx: 0, sy: 0, mx: 0, my: 0 };
        return;
      }
      let { sx, sy, mx, my } = this.sliderBoxPosition;
      sx = sx + mx;
      sy = sy + my;
      mx = 0;
      my = 0;
      Object.assign(this.sliderBoxPosition, { sx, sy, mx, my });
    }

    //滑块容器鼠标移动事件，滑块在容器内滑动
    sliderBoxMove(e) {
      e.stopPropagation();
      e.preventDefault();
      let { movementX, movementY } = e;
      let { sx, sy, mx, my } = this.sliderBoxPosition;
      mx = mx + movementX;
      my = my + movementY;

      let { left, top } = this.moveObj.sliderBoxMove({
        sx,
        sy,
        mx,
        my
      });
      //根据滑动距离，判断展示细节图片局部位置
      this.moveShowImageToPosition(left, top);
      Object.assign(this.sliderBoxPosition, { mx, my });
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

    moveShowImageToPosition(sliderLeft, sliderTop) {
      let sLeft = sliderLeft * this.magification;
      let sTop = sliderTop * this.magification;
      this.showImage.style.left = `${-sLeft}px`;
      this.showImage.style.top = `${-sTop}px`;
    }

    //该方法只适用于图片内嵌局部区域，无效
    moveShowBoxToPosition() {
      //判断展示图片位置
      let x = 0,
        y = 0;
      const spaceSize = 10;
      const domW = this.showSize;
      const domH = this.showSize;
      const { offsetWidth: parentW, offsetHeight: parentH } = this.imageContain;
      const {
        offsetLeft: sliderL,
        offsetTop: sliderT,
        offsetWidth: sliderW,
        offsetHeight: sliderH
      } = this.contain;
      // 展示容器 d shoxBox、展示容器父级 showContain p、待放大区域 s sliderContain,（禁止放置区域暂定，检索对比图）
      // 右侧   sl + sw + dw < pw  left = pw - dw
      const right = sliderL + sliderW + domW < parentW;
      // 左侧   dw < sl  left = 0
      // 不满足 left = pw
      const left = domW < sliderL;
      // 上下侧区域条件
      // 下侧  st + sh + dh < ph  top = ph - dh
      const bottom = sliderT + sliderH + domH < parentH;

      // 中间
      const middleT = sliderT + domH + spaceSize < parentH;
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
      } else if (middleT) {
        y = sliderT + spaceSize;
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
      this.contain.appendChild(sliderBox);
      sliderBox.style.display = 'none';
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
      this.contain.appendChild(showBox);
      this.showImage = showImage;
      showBox.style.display = 'none';
      this.showBox = showBox;
    }
  }

  return Magifiner;
})();
