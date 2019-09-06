window.onload = function() {
  let contain = document.getElementById('origin-contain');
  let cut = document.getElementById('cut-contain');
  let cutList = document.getElementById('cut-list');
  let imageUrl = contain.getElementsByTagName('img')[0].src;
  let rectCut = new RectCutControl(contain, cut, cutList, imageUrl);
};
