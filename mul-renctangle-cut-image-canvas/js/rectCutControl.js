const RectCutControl = (function() {
  const createImageTag = function(imgUrl) {
    let img = new Image();
    img.src = imgUrl;
    img.setAttribute('crossOrigin', 'Anonymous');
    return img;
  };

  // 原图按比例缩放 2、4、8
  const computeOriginScale = function(w, h) {
    const MinPixel = 1920 * 1080;
    const MaxPixel = 4096 * 2160;
    const pixel = w * h;
    if (pixel < MinPixel) {
      return 2;
    } else if (pixel < MaxPixel) {
      return 4;
    } else {
      return 8;
    }
  };

  // 裁剪图片按比例缩放 2、4、8
  const computeCutScale = function(w, h) {
    const MinPixel = 400 * 300;
    const MaxPixel = 800 * 600;
    const pixel = w * h;
    let scale = 0,
      scaleW = 0,
      scaleH = 0;
    if (pixel < MinPixel) {
      scale = 1;
    } else if (pixel < MaxPixel) {
      scale = 2;
    } else {
      scale = 4;
    }
    scaleW = w / scale;
    scaleH = h / scale;
    return { scale, scaleW, scaleH };
  };

  let rectCut = function(contain, cut, cutList, imageUrl) {
    this.times = 4;
    this.w = contain.clientWidth;
    this.h = contain.clientHeight;
    this.contain = contain;
    this.cut = cut;
    this.cutList = cutList;
    this.drawArea = new DrawArea(contain, this.w, this.h);
    // bind 将当前环境绑定给 function 内的this
    this.drawArea.setCompleteFnc(originDrawComplete.bind(this));
    this.paretPosition = null;
    this.cutDrawArea = null;
    this.cutImageObj = new CutImage(imageUrl);
    this.imageUrl = imageUrl;
    this.cutImageDom = null;
    this.originScale = 1;
    this.cutScale = 1;
  };

  // 根据矩形位置在原图裁剪出车身
  rectCut.prototype.computeCutImagePosition = function(position) {
    let { sx, sy, mx, my } = position;
    let left = sx;
    let right = mx;
    let top = sy;
    let bottom = my;
    let cutW = Math.abs(sx - mx);
    let cutH = Math.abs(sy - my);
    let result = { cutW, cutH, top, right, bottom, left };
    for (key in result) {
      result[key] = result[key] * this.times;
    }
    return result;
  };

  // 根据矩形位置在裁剪车身剪出特征
  rectCut.prototype.computeCutFeaturePosition = function(position) {
    let { scale } = this.cutScale;
    let { top: ptop, left: pleft } = this.paretPosition;
    console.log();
    for (key in position) {
      position[key] = position[key] * scale;
    }
    let { sx, sy, mx, my } = position;
    let left = sx + pleft;
    let right = mx + pleft;
    let top = sy + ptop;
    let bottom = my + ptop;
    let cutW = Math.abs(sx - mx);
    let cutH = Math.abs(sy - my);
    return { cutW, cutH, top, right, bottom, left };
  };

  rectCut.prototype.updateImageUrl = function(imageUrl) {
    this.imageUrl = imageUrl;
    // 需要清空所有数据，还没写
    this.cutImageObj.updateImageUrl(imageUrl);
  };

  const partCarCutComplete = function(imgUrl) {
    let imgTag = createImageTag(imgUrl);
    this.cutList.appendChild(imgTag);
  };

  let oldLen = -1;
  const cutDrawComplete = function(positions) {
    const len = positions.length;
    if (len > 0 && oldLen !== len) {
      oldLen = len;
      let index = len - 1;
      let { cutW, cutH, top, left } = this.computeCutFeaturePosition(
        positions[index]
      );
      this.cutImageObj.handleCutImage(
        { cutW, cutH, top, left },
        partCarCutComplete.bind(this)
      );
    }
  };

  const originDrawComplete = function(positions) {
    let [position] = positions;
    let { cutW, cutH, top, right, bottom, left } = this.computeCutImagePosition(
      position
    );
    this.paretPosition = { cutW, cutH, top, right, bottom, left };
    let { scale, scaleW, scaleH } = computeCutScale(cutW, cutH);
    this.cutScale = { scale, scaleW, scaleH };
    if (!this.cutDrawArea) {
      this.cutDrawArea = new DrawArea(this.cut, scaleW, scaleH);
      this.cutDrawArea.setMultiple();
      this.cutDrawArea.setCompleteFnc(cutDrawComplete.bind(this));
    } else {
      // 需要清空之前数据
      this.cutDrawArea.resetCanvasAndPsition();
      this.cutDrawArea.upSize(scaleW, scaleH);
    }
    this.cutImageObj.handleCutImage(
      { cutW, cutH, top, left },
      originCutComplete.bind(this)
    );
  };

  const originCutComplete = function(imgUrl) {
    if (!this.cutImageDom) {
      let imageDom = createImageTag(imgUrl);
      this.cut.appendChild(imageDom);
      this.cutImageDom = imageDom;
    } else {
      this.cutImageDom.src = imgUrl;
    }
    let { scaleW, scaleH } = this.cutScale;
    this.cutImageDom.style = `width:${scaleW}px;height:${scaleH}px`;
  };

  return rectCut;
})();
