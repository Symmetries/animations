function setup() {
  createCanvas(400, 400);
  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 3,
    gif: true,
    options: {quality: 10,
      workers: 3,
      width: width,
      height: height
    }
  });
}

function draw() {
  background(255);
}
