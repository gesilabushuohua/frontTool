(function() {
  let contain = document.getElementById('car-image');
  let imageTagName = 'origin-img';
  let showBox = document.getElementById('showbox');
  let magnifiner = new ImageMagnifiner(contain, imageTagName);
  magnifiner.setMagifinerAndSliderSize(2, 150);
  magnifiner.setAppointMoveType(showBox);

  let contain2 = document.getElementById('list');
  let imageTagName2 = 'hover';
  let magnifiner2 = new ImageMagnifiner(contain2, imageTagName2);
  magnifiner2.setNextMoveType();
})();
