/** 
 鼠标滑过，弹出消息
*/
class HoverMessage {
  constructor(domParent, data) {
    //  父级容器
    this.domParent = domParent;
    //  存储数据信息
    this.data = data;
    this.boxContain = null;
    this.boxContent = null;
    this.handleWatchParam();
    this.initMouseEvent();
    this.createMessageBox();
  }

  initMouseEvent() {
    let that = this;
    that.domParent.onmouseover = function(e) {
      let index = e.target.dataset.index;
      if (index) {
        console.log("onmouseover", index);
        // that.watchParam.currentIndex = index;
      }
    };
    that.domParent.onmouseout = function(e) {
      try {
        let fromIndex = e.fromElement.dataset.index;
        let toIndex = e.toElement.dataset.index;
        //  鼠标离开指定位置
        if (fromIndex && !toIndex) {
          console.log("onmouseout");
          // that.watchParam.currentIndex = -1;
        }
      } catch (err) {
        //  属性读取失败，符合鼠标离开条件
        console.log("onmouseout");
        // that.watchParam.currentIndex = -1;
      }
    };
  }

  //  检测 currentIndex 是否变化
  handleWatchParam() {
    this.watchParam = new Proxy(
      {},
      {
        set: function(obj, prop, value) {
          if (prop === "currentIndex") {
            console.log("same", obj[prop] === value);
            obj[prop] = value;
            console.log("set " + obj[prop]);
          }
          return true;
        }
      }
    );
  }

  // 创建消息弹窗
  createMessageBox() {
    this.boxContain = document.createElement("DIV");
    this.boxContain.classList = "message-box message-box-top";
    this.boxContent = this.createMessageBoxContent();
    this.boxContain.appendChild(this.boxContent);
    document.body.appendChild(this.boxContain);
  }

  // 创建消息弹窗
  createMessageBoxContent() {
    let content = "<p>标题</p>";
    let boxContent = document.createElement("DIV");
    return boxContent;
  }

  //

  //  销毁弹窗及监听事件
  destoryMouseEvent() {
    document.body.removeChild(this.boxContain);
    this.domParent.onmouseover = null;
    this.domParent.onmouseout = null;
  }
}
