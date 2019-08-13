(function() {
 
})();

window.onload = function() {
  let contain = document.getElementById("canvas-contain");
  let w = contain.clientWidth,
    h = contain.clientHeight;
  let canvasObj = createCanvas(contain, w, h);
  console.log('______', [canvasObj]);  
  let drawObj = new Rectangle(canvasObj);
  initCanvasEvent(canvasObj, drawObj);
};

let drawing = false; 

function createCanvas(contain, w, h) {
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  contain.appendChild(canvas);
  return canvas;
}

function initCanvasEvent(canvasObj, drawObj) {
  let that = this;
  canvasObj.onmousedown = function(e) {
    that.drawing = true;
    drawObj.openDraw(e.layerX, e.layerY);
  };

  canvasObj.onmousemove = function(e) {
    if (that.drawing) {
      drawObj.moveDraw(e.layerX, e.layerY);
    }
    
  };

  canvasObj.onmouseup = function(e) {
    if (that.drawing) {
      drawObj.moveDraw(e.layerX, e.layerY);
    }
    that.drawing = false;
  };
}
