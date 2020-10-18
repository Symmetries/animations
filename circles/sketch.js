let numCircles = 3;
let linesPerCircle = [8, 8, 8];
let startingAngles;
let rs;
let Rs;
let angles;

function f(x) {
  return 2 * atan((tan(x * PI) ** 2)) / PI;
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 8,
    gif:true,
    options: {quality: 10,
      workers: 3,
      width: width,
      height: height
    }
  });
  strokeWeight(5);
  noFill();
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  rs = [
    map(f(animLoop.progress), 0, 1, 80, 60),
    map(f(2 * animLoop.progress), 0, 1, 80, 90),
    map(f(3 * animLoop.progress), 0, 1, 80, 30),
  ]

  Rs = [
    map(f(2 * animLoop.progress), 0, 1, 0, 50),
    map(f(animLoop.progress), 0, 1, 0, 50),
    map(f(3 * animLoop.progress), 0, 1, 0, 50),
  ]

  angles = [
    map(f(animLoop.progress), 0, 1, 0, 4 * PI + 4 * PI / 3),
    map(f(animLoop.progress), 0, 1, 2 * PI, - 2 * PI / 3),
    map(f(animLoop.progress), 0, 1, 0, 2 * PI),
  ]

  startingAngles = [
    map(f(animLoop.progress), 0, 1, 0, 2 * PI),
    map(-1.5 * f(animLoop.progress), 0, 1, 0, 2 * PI),
    map(2 * f(animLoop.progress), 0, 1, 0, 2 * PI),
  ];

  for (let j = 0; j < numCircles; j++) {
    let numLines = linesPerCircle[j];
    let r = rs[j];
    let startingAngle = startingAngles[j];
    let R = Rs[j];
    let angle = angles[j];
    
    for (let i = 0; i < numLines; i++) {
      arc(R * cos(angle), R * sin(angle), 2 * r, 2 * r,
        startingAngle + (i + (j-1)/3)/ numLines * 2 * PI,
        startingAngle + (i + j/3) / numLines * 2 * PI);
    }
  }
}
