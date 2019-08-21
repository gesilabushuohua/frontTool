/** 
 鼠标滑过，弹出消息
*/
class HoverMessage {
  constructor(domParent, infos) {
    // 设置父级相对定位
    domParent.style = 'position:relative;';
    //  父级容器
    this.domParent = domParent;
    //  存储数据信息
    this.infos = infos;
    //  消息弹窗容器
    this.boxContain = null;
    //  消息弹窗内容
    this.boxContent = null;
    this.handleWatchParam();
    this.watchParam.currentIndex = -1;
    this.initMouseEvent();
    this.createMessageBox();
  }

  initMouseEvent() {
    let that = this;
    that.domParent.onmouseover = function(e) {
      let index = e.target.dataset.index;
      if (index) {
        that.watchParam.currentIndex = index;
      }
    };
    that.domParent.onmouseout = function(e) {
      try {
        let fromIndex = e.fromElement.dataset.index;
        let toIndex = e.toElement.dataset.index;
        //  鼠标离开指定位置
        if (fromIndex && !toIndex) {
          that.watchParam.currentIndex = -1;
        }
      } catch (err) {
        //  属性读取失败，符合鼠标离开条件
        that.watchParam.currentIndex = -1;
      }
    };
  }

  //  检测 currentIndex 是否变化
  handleWatchParam() {
    let that = this;
    this.watchParam = new Proxy(
      {},
      {
        set: function(obj, prop, value) {
          if (prop === 'currentIndex') {
            if (obj[prop] !== value && value !== -1) {
              obj[prop] = value;
              that.showMessageBox();
            } else if (obj[prop] !== value && value === -1) {
              if (that.boxContain) {
                that.boxContain.style = 'display:none';
              }
            }
            obj[prop] = value;
          }
          return true;
        }
      }
    );
  }

  showMessageBox() {
    this.boxContain.style = 'display:block';
    this.updateMessageBox();
    this.judgePosition();
  }

  //  判断位置
  judgePosition() {
    let index = this.watchParam.currentIndex;
    let dom = this.domParent.children[index];
    let { offsetLeft: domLfet, offsetTop: domTop, offsetHeight: domH } = dom;
    let scrollTop = this.domParent.offsetParent.scrollTop;
    //   10 对话框三角形高度
    let boxH = this.boxContain.clientHeight;
    let classList = '';
    let x = 0,
      y = 0;

    //  对话框出现在下方
    if (boxH > domTop - scrollTop) {
      y = domTop + (domH + 10);
      classList = 'message-box message-box-bottom';
    } else {
      y = domTop - (boxH + 10);
      classList = 'message-box message-box-top';
    }

    x = domLfet;
    this.boxContain.style = `left:${x}px;top:${y}px`;
    this.boxContain.classList = classList;
  }

  //  更新
  updateMessageBox() {
    let boxContent = this.createMessageBoxContent();
    this.boxContain.removeChild(this.boxContent);
    this.boxContain.appendChild(boxContent);
    this.boxContent = boxContent;
  }

  // 创建消息弹窗
  createMessageBox() {
    this.boxContain = document.createElement('DIV');
    this.boxContain.classList = 'message-box message-box-top';
    this.boxContain.style = 'display:none';
    this.boxContent = this.createMessageBoxContent();
    this.boxContain.appendChild(this.boxContent);
    this.domParent.appendChild(this.boxContain);
  }

  // 创建消息弹窗
  createMessageBoxContent() {
    let index = this.watchParam.currentIndex;
    let boxContent = document.createElement('DIV');
    boxContent.classList = 'box-body';
    if (index < 0) {
      return boxContent;
    }
    let info = this.infos[index];
    info.forEach(val => {
      let text = document.createElement('P');
      text.innerHTML = val;
      boxContent.appendChild(text);
    });
    return boxContent;
  }

  //  销毁弹窗及监听事件
  destoryMouseEvent() {
    document.body.removeChild(this.boxContain);
    this.domParent.onmouseover = null;
    this.domParent.onmouseout = null;
  }
}
