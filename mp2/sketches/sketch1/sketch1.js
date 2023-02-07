let angle = 0;
let side = 500;
let levels = 100;
let decreaseBy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  translate(width / 2, height / 2);
  rectMode(CENTER);
  fill("black");
  side = Math.min(windowWidth * 0.8, windowHeight * 0.8);
  decreaseBy = side * 0.01;
  rect(0, 0, side * 1.05, side * 1.05);
  drawSquare(0, 0, side);
}

function drawSquare(x, y, side) {
  fill("white");
  rectMode(CENTER);
  rect(x, y, side, side);
  if (side > 10) {
    // levels = levels - 1;
    rotate(radians(PI / 2));
    drawSquare(x, y, side - decreaseBy);
  }
}
