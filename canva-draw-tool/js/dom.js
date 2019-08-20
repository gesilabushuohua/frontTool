window.onload = function() {
  let contain = document.getElementById('canvas-contain');
  let w = contain.clientWidth,
    h = contain.clientHeight;
  let drawArea = new DrawArea(contain, w, h);
  let toolDom = document.getElementById('tool');
  toolDom.addEventListener(
    'click',
    function(e) {
      let type = e.target.dataset.type;
      if (type) {
        activeBtn(toolDom, e.target);
        drawArea.setDrawType(type);
      }
    },
    false
  );
};

function activeBtn(parentDom, dom) {
  let children = parentDom.children;
  for (let child of children) {
    child.classList = [];
  }
  dom.classList = ['active'];
}
