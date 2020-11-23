let R = 120;
let r = 60;
let num = 72;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  createLoop({
    duration: 30,
    gif:true,
    options: {quality: 1,
      workers: 3,
      width: width,
      height: height
    }
  });
  noFill();
  strokeWeight(8);
}

function draw() {
  background(255);

  translate(width / 2, height / 2);
  rotate(-PI / 2);

  for (let i = 1; i <= 12; i++) {
    let theta = i * animLoop.theta;

    for (let j = 0; j < num; j++) {
      let phi = map(i + j, 0, num, 0, 2 * PI);
      let phi2 = map(i + j + 1, 0, num, 0, 2 * PI);
      if (j % 12 == 0) {
        arc(R * cos(theta), R * sin(theta), 2 * r, 2 * r, 2 * theta + phi, 2 * theta + phi2);
      }
      // ellipse(R * cos(theta), R * sin(theta), 2 * r);
    }
  }
}
