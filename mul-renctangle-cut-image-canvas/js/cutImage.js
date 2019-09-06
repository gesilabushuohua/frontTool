const CutImage = (function() {
  let cutImage = function(imageUrl) {
    this.originImage = null;
    this.cutCanvas = null;
    this.cutCtx = null;
    this.resultUrl = null;
    this.imageUrl = imageUrl;
  };

  cutImage.prototype.updateImageURL = function() {
    this.originImage = null;
  };

  //裁剪图片,参数
  // 位置信息 cutW, cutH, top, left，
  // 完成后 callFnc
  cutImage.prototype.handleCutImage = function(position, successCutFnc) {
    this.successCutFnc = successCutFnc;
    if (!this.cutCtx) {
      let cutCanvas = document.createElement('canvas');
      cutCanvas.width = 640;
      cutCanvas.height = 480;
      cutCtx = cutCanvas.getContext('2d');
      this.cutCanvas = cutCanvas;
      this.cutCtx = cutCtx;
    }
    if (!this.originImage) {
      this.originImage = new Image();
      this.originImage.setAttribute('crossOrigin', 'Anonymous');
      this.originImage.src = this.imageUrl;
      let that = this;
      this.originImage.onload = function() {
        that.canvasToImage(position);
      };
    } else {
      this.canvasToImage(position);
    }
  };

  cutImage.prototype.canvasToImage = function(position) {
    let { cutW, cutH, top, left } = position;
    this.cutCanvas.width = cutW;
    this.cutCanvas.height = cutH;
    console.log('canvasToImage', position);
    this.cutCtx.clearRect(0, 0, cutW, cutH);
    this.cutCtx.drawImage(
      this.originImage,
      left,
      top,
      cutW,
      cutH,
      0,
      0,
      cutW,
      cutH
    );
    let url = this.cutCanvas.toDataURL('image/png');
    this.successCutFnc ? this.successCutFnc(url) : this.errorCutFnc();
  };

  cutImage.prototype.errorCutFnc = function() {
    throw new Error('successCutFnc is not defined');
  };

  return cutImage;
})();
