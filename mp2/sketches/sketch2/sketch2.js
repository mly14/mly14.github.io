let seed;
let sqSize = 400;
let color1 = ["#E81513","#F2137B","#DB1DD5","#BA13F2","#7713E8"];
let color2 = ["#81AAE6","#86CDF0","#85D4DA","#86F0D9","#81E6B4"];
let color3 = ["#E8AD84","#F2A58A","#DB9288","#F28A94","#E884C0"];

function fixedCanvas(width, height) {
  resizeCanvas(width, height);
  const style = canvas.style;
  const amt = "90%";
  if (innerWidth / innerHeight > width / height) {
    style.width = "auto";
    style.height = amt;
  } else {
    style.height = "auto";
    style.width = amt;
  }
  style.top = style.left = style.bottom = style.right = "0";
  style.position = "absolute";
  style.margin = "auto";
}

// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
  fixedCanvas(4000, 4000);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Render loop that draws shapes with p5
function draw() {
  colorMode(HSL);
  noStroke();
  background(0, 0, 95);
  fill("black");
  frameRate(0.75);
  const count = floor(random(150, 200));

  const colorSet = random([color1, color2, color3]);

  for (let x = 0; x < width; x+=sqSize) {
    for (let y=0; y<height; y+=sqSize){
      const hasCircle = floor(random(0, 2));
      const colorFill = random(colorSet);
      fill(colorFill);
      square(x, y, sqSize);
      if (hasCircle == 1) {
        const colorFill = random(colorSet);
        fill(colorFill);
        circle(x, y+(sqSize/2), sqSize);
      }
    }
  }
}
