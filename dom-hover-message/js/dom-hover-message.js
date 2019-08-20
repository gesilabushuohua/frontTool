/** 
 鼠标滑过，弹出消息
*/
class HoverMessage {
  constructor(domParent, data) {
    this.domParent = domParent;
    this.data = data;
    this.messageBox = null;
    this.handleWatchParam();
    this.initMouseEvent();
  }

  initMouseEvent() {
    let that = this;
    that.domParent.onmouseover = function(e) {
      let index = e.target.dataset.index;
      if (index) {
        console.log('onmouseover', index);
        // that.watchParam.currentIndex = index;
      }
    };
    that.domParent.onmouseout = function(e) {
      try {
        let fromIndex = e.fromElement.dataset.index;
        let toIndex = e.toElement.dataset.index;
        //  鼠标离开指定位置
        if (fromIndex && !toIndex) {
          console.log('onmouseout');
          // that.watchParam.currentIndex = -1;
        }
      } catch (err) {
        //  属性读取失败，符合鼠标离开条件
        console.log('onmouseout');
        // that.watchParam.currentIndex = -1;
      }
    };
  }

  destoryMouseEvent() {
    this.domParent.onmouseover = null;
    this.domParent.onmouseout = null;
  }

  //  检测 currentIndex 是否变化
  handleWatchParam() {
    this.watchParam = new Proxy(
      {},
      {
        set: function(obj, prop, value) {
          if (prop === 'currentIndex') {
            console.log('same', obj[prop] === value);
            obj[prop] = value;
            console.log('set ' + obj[prop]);
          }
          return true;
        }
      }
    );
  }

  // 创建消息弹窗
  createMessageBox() {}

  // 创建消息弹窗
  createMessageBoxBody() {}
}
