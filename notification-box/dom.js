/*
html notification 在 chrome 版本 76.0.3809.100（正式版本） （64 位） 无效
*/
(function() {
  let btn = document.getElementById("btn");
  let that = this;
  let notificationBox = new NotificationBox();
  btn.onclick = function() {
    let infos = [
      "车牌号：粤XXXXX",
      "过车时间：2019/08/05",
      "卡口名称：惠博大道",
      "设备名称：博罗城区方向"
    ];
    let noReadNum = 14;
    let imageUrl = "./3.jpg";
    let param = { noReadNum, imageUrl, infos };
    notificationBox.createShow();
    notificationBox.showBox({ noReadNum, imageUrl, infos });
  };
})();
