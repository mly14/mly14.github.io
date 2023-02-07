let osc, playing, freq, amp;
let trail = [];
let a = 0;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator("sine");
}

function draw() {
  background(220);
  freq = constrain(map(mouseY, 0, height, 500, 100), 100, 500);

  let panning = map(mouseX, 0, width, -1.0, 1.0);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(0.2);
    osc.pan(panning);
  }
  trail.push([mouseX, mouseY]);
  for (let i = 0; i < trail.length; i++) {
    noStroke();
    fill("orange");
    ellipse(trail[i][0], trail[i][1], 8);
    // for (let i = 0; i < 10; i ++) {
    //   ellipse(0, 30, 20, 80);
    //   rotate(PI/5);
    // }
    if (a > 255) {
      trail.shift();
      a = 0;
    }
    a += 8;
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}
