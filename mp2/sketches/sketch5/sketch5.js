let rad; // Width of the shape
let xpos, ypos; // Starting position of shape

let xspeed = 5; // Speed of the shape
let yspeed = 5; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

let color = "#e29578";

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(40);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = random(0, windowWidth);
  ypos = random(0, windowHeight);
  // Setup a synth with ToneJS
  synth = new Tone.Synth({
    oscillator: {
      type: "sine",
    },
  });

  // Wire up our nodes:
  // synth->master
  synth.connect(Tone.Master);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(color);
  xspeed = windowWidth / 90;
  yspeed = windowHeight / 90;
  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;
  rad = windowHeight / 10;
  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (xpos > windowWidth - rad || xpos < rad) {
    xdirection *= -1;
    playNote();
    changeColor();
  }
  if (ypos > windowHeight - rad || ypos < rad) {
    ydirection *= -1;
    playNote();
    changeColor();
  }

  // Draw the shape
  ellipse(xpos, ypos, rad, rad);
}

function playNote() {
  const notes = ["C", "D", "E", "G"];
  const octaves = [4, 5];
  const octave = random(octaves);
  const note = random(notes);
  synth.triggerAttackRelease(note + octave, "8n");
}

function changeColor() {
  const colors = ["#006d77", "#83c5be", "#ffddd2", "#e29578", "#caf0f8"];
  color = random(colors);
  background(color);
}
