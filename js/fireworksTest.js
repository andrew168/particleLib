
// create a canvas for the fireworks
mainCanvas = document.createElement('canvas');
mainContext = mainCanvas.getContext('2d');

// and another one for, like, an off screen buffer
// because that's rad n all
fireworkCanvas = document.createElement('canvas');
fireworkContext = fireworkCanvas.getContext('2d');

// add the canvas in
document.body.appendChild(mainCanvas);
document.addEventListener('mouseup', fire, true);
document.addEventListener('touchend', fire, true);

function fire() {
  Fireworks.fire();
  // LineEmitter();
}

// Go
window.onload = function() {
  var option = {
    mainCanvas: mainCanvas,
    mainContext: mainContext,
    auxCanvas: fireworkCanvas,
    auxContext: fireworkContext
  };
  Fireworks.initialize(option);
  var num = 1;
  for (i = 0; i< num; i++ ){
    Fireworks.fire();
  }
  // LineEmitter();
};
