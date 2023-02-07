let rings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  noFill();

  // Make it look pretty
  strokeWeight(2);
  // frameRate(30);
  if (frameCount % 2 === 0) {
    // radius now starts at zero
    rings.push(new Ring(mouseX, mouseY, 0));
  }

  // Limit the amount of rings in the array to nine
  // if (rings.length > 20) {
  //   rings.shift();
  // }
  // rings.push(new Ring(mouseX, mouseY, 0));

  rings.forEach((ring) => {
    // Call the update function each time we draw a circle
    if (movedX > 0 || movedY > 0) {
    }
    ring.draw();
    ring.update();
  });
}

function mousePressed() {
  rings.push(new Ring(mouseX, mouseY));
}

class Ring {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  update() {
    this.radius += 1;
    if (this.radius > 50) {
      rings.shift();
    }
  }
  draw() {
    circle(this.x, this.y, this.radius);
    stroke("blue");
  }
}
