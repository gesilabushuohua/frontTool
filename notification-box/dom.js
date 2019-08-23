/*
html notification 在 chrome 版本 76.0.3809.100（正式版本） （64 位） 无效
*/
(function() {
  let btn = document.getElementById('btn');
  let that = this;
  console.log(window);
  btn.onclick = function() {
    // this.nofificationMessage();
    that.showNotice();
  };
})();
function showNotice() {
  Notification.requestPermission(function(perm) {
    if (perm == 'granted') {
      var notification = new Notification('这是一个通知撒:', {
        dir: 'auto',
        lang: 'hi',
        tag: 'testTag',
        icon: 'https://static.cnblogs.com/images/adminlogo.gif',
        body: '通知content'
      });
      console.log(notification);
    }
  });
}

function nofificationMessage() {
  //  检测浏览器是否支持
  let notification = null;
  let that = this;
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop Notification');
  }
  //  检查用户是否同意接受通知
  else if (Notification.permission === 'granted') {
    notification = new Notification('桌面推送', {
      body: '这是我的第一条桌面推送',
      icon: '/3.jpg'
    });
  }
  //  否在需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // 如果用户同意，就可以向他们发送通知
      console.log(permission);
      if (permission === 'granted') {
        let notification = new Notification('桌面推送', {
          body: '这是我的第一条桌面推送',
          icon: '/3.jpg'
        });
        console.log({ notification });
      }
    });
  }
  return notification;
}

/* 
Notification.permission  

denied 用户拒绝了通知显示

granted 用户允许通知显示

default 不知道用户选择，浏览器行为与 denied 相同

*/
