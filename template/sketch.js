function setup() {
  createCanvas(200, 200);
  frameRate(30);
  createLoop({
    duration: 3,
    gif:true,
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
