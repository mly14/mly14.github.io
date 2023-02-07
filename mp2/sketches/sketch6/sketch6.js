let rings = [];
let cnv;
let osc, playing, freq, amp;

function setup() {
  cnv = createCanvas(400, 400);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator("sine");
}

function draw() {
  cnv.mousePressed(playOscillator);

  background(255);

  noFill();

  strokeWeight(2);
  if (frameCount % 2 === 0) {
    rings.push(new Ring(mouseX, mouseY, 0));
  }

  rings.forEach((ring) => {
    ring.draw();
    ring.update();
  });
  soundfreq = constrain(map(mouseY, 0, height, 500, 100), 100, 500);
  let panning = map(mouseX, 0, width, -1.0, 1.0);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(soundfreq, 0.1);
    osc.pan(panning);
    // osc.amp(amp, 0.1);
  }
}

function mousePressed() {
  rings.push(new Ring(mouseX, mouseY, 0));
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
  }
}

function playOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  // playing = false;
}
