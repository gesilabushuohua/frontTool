(function() {
  let imageContain = document.getElementById('origin-img');
  let sliderContain = document.getElementById('carFrame');
  let showContain = document.getElementById('car-image');
  let magnifiner = new ImageMagnifiner(
    imageContain,
    sliderContain,
    showContain
  );
})();
