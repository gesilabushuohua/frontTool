
window.onload = function() {
  let contain = document.getElementById("canvas-contain");
  let w = contain.clientWidth,
    h = contain.clientHeight;
    let drawArea = new DrawArea(contain, w, h);
};

