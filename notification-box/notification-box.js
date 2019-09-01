const NotificationBox = (function() {
  let notification = function(clickFnc) {
    // 所有未阅读信息
    this.noReadNum = 0;
    this.createBox();
    this.initEvent();
    this.hiddenBox();
  };

  notification.prototype.createBox = function() {
    let box = document.createElement("DIV");
    box.classList = "notification-box";
    let boxHead = document.createElement("DIV");
    boxHead.classList = "box-head";
    let headText = document.createElement("SPAN");
    let headClose = document.createElement("SPAN");
    headClose.classList = 'close';
    headClose.innerText = 'X';
    let boxBody = document.createElement("DIV");
    boxBody.classList = "box-body";
    let bodyImage = document.createElement("IMG");
    let bodyInfo = document.createElement("DIV");
    bodyInfo.classList = "infos";
    let boxFooter = document.createElement("DIV");
    boxFooter.innerText = '查看详情';
    boxFooter.classList = 'box-footer';
    box.appendChild(boxHead);
    box.appendChild(boxBody);
    box.appendChild(boxFooter);
    boxHead.appendChild(headText);
    boxHead.appendChild(headClose);
    boxBody.appendChild(bodyImage);
    boxBody.appendChild(bodyInfo);
    document.body.appendChild(box);
    this.box = box;
    this.headText = headText;
    this.bodyImage = bodyImage;
    this.bodyInfo = bodyInfo;
  };

  notification.prototype.initEvent = function() {
    let that = this;
    this.box.onclick = function(e){
      e.stopPropagation();
      if(e.target.className.indexOf('close')>-1){
        console.log('close');
        that.hiddenBox();
      }
      //that.clickFnc();
    }
  };

  notification.prototype.UpdateBoxHead = function() {
    this.headText.innerHTML = "最新消息（" + this.noReadNum + "条未阅读）";
  };

  notification.prototype.UpdateBoxBodyImg = function() {
    this.bodyImage.src = this.imageUrl;
  };

  notification.prototype.UpdateBoxBodyInfos = function() {
    if(!this.infos){
      return;
    }
    this.bodyInfo.innerHTML = '';
    this.infos.forEach(info => {
      let ele = document.createElement('P');
      ele.innerHTML = info;
      this.bodyInfo.appendChild(ele);
    });
  };
  
  notification.prototype.showBox = function({ noReadNum =null, imageUrl=null, infos=null }) {
    console.log('showBox');
    this.noReadNum = noReadNum;
    this.imageUrl = imageUrl;
    this.infos = infos;
    this.UpdateBoxHead();
    this.UpdateBoxBodyImg();
    this.UpdateBoxBodyInfos();
    this.box.style.display = 'block';

  };

  notification.prototype.hiddenBox = function() {
    this.box.style.display = 'none';
  };

  return notification;
})();
