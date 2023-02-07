let size = 60;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let x = 0 - size; x < width + size; x += size) {
    for (let y = 0 - size; y < height + size; y += size) {
      push();
      translate(x, y);
      rotate(-angle * 2);
      fill("salmon");
      triangle(0, size * sin(60), size / 2, 0, size, size * sin(60));
      pop();
      push();
      translate(x, y);
      rotate(angle);
      fill("teal");
      triangle(0, size * sin(60), size / 2, 0, size, size * sin(60));
      pop();
      angle += 0.002;
    }
  }
}
