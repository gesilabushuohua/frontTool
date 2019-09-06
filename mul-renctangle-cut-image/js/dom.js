window.onload = function() {
  let contain = document.getElementById('origin-contain');
  /* piex 1920*1080 */
  let times = 4;
  let w = contain.clientWidth,
    h = contain.clientHeight;
  let imageUrl = '';
  let cutDrawArea = null;
  let cutPosition = null;
  let cutImg = null;

  const computeCutFeaturePosition = function(position) {
    let { top: ptop, left: pleft } = cutPosition;
    let { sx, sy, mx, my } = position;
    let left = sx + pleft;
    let right = mx + pleft;
    let top = sy + ptop;
    let bottom = my + ptop;
    let cutW = Math.abs(sx - mx);
    let curH = Math.abs(sy - my);
    return { cutW, curH, top, right, bottom, left };
  };

  let oldLen = -1;
  const cutDrawComplete = function(positions) {
    let len = positions.length;
    if (len > 0 && oldLen !== len) {
      oldLen = len;
      let index = len - 1;
      let imgContain = document.createElement('DIV');
      /*  cutImageByPosition(imgContain, imageUrl, positions[index]); */
      let { cutW, curH, top, right, bottom, left } = computeCutFeaturePosition(
        positions[index]
      );
      imgContain.style = `position:relative;width:${cutW}px;height:${curH}px;`;
      let img = new Image();
      img.src = imageUrl;
      //根据大小判断缩放比例
      //便于图形定位
      img.style = `
      position: absolute;
      left:-${left}px;
      top:-${top}px;
      clip: rect(${top}px,${right}px,${bottom}px,${left}px)`;
      imgContain.append(img);
      let cutList = document.getElementById('cut-list');
      cutList.appendChild(imgContain);
    }
  };

  const computeCutImagePosition = function(position) {
    let { sx, sy, mx, my } = position;
    let left = sx;
    let right = mx;
    let top = sy;
    let bottom = my;
    let cutW = Math.abs(sx - mx);
    let curH = Math.abs(sy - my);
    let result = { cutW, curH, top, right, bottom, left };
    for (key in result) {
      result[key] = result[key] * 4;
    }
    return result;
  };

  const originDrawComplete = function(positions) {
    let [position] = positions;
    imageUrl = contain.getElementsByTagName('img')[0].src;
    let image = new Image();
    image.src = imageUrl;

    let { cutW, curH, top, right, bottom, left } = computeCutImagePosition(
      position
    );
    cutPosition = { cutW, curH, top, right, bottom, left };
    let cut = document.getElementById('cut-contain');

    if (!cutImg) {
      cutImg = new Image();
      cutImg.src = imageUrl;
      cut.innerHTML = '';
      cut.appendChild(cutImg);
    }

    //根据大小判断缩放比例
    //便于图形定位
    let cutTimes = 1;
    cutImg.style = `
    position: absolute;
    left:-${left}px;
    top:-${top}px;
    zoom: ${1 / cutTimes};
    clip: rect(${top}px,${right}px,${bottom}px,${left}px)`;
    cut.style = `width:${cutW}px;height:${curH}px;`;
    if (!cutDrawArea) {
      cutDrawArea = new DrawArea(cut, cutW, curH);
      cutDrawArea.setMultiple();
      cutDrawArea.setCompleteFnc(cutDrawComplete);
    } else {
      let cutCanvasObj = cutDrawArea.getCanvasObj();
      cutCanvasObj.width = cutW;
      cutCanvasObj.height = curH;
    }
  };

  let drawArea = new DrawArea(contain, w, h);
  drawArea.setCompleteFnc(originDrawComplete);

  /*  drawArea.setMultiple(); */
};
