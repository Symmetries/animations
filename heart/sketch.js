let phi = (1 + 5**0.5)/2;
let radius;
let maxPoints = 40;

function f(x) {
  return atan(tan(x * PI / 2)**2) * 2 / PI;
}

function setup() {
  createCanvas(720, 720);
  radius = 0.5 * width / phi;

  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 10,
    gif:true,
    options: {
      quality: 10,
      workers: 3,
    }
  });
  strokeWeight(8)
}

function draw() {
  background(255);

  let numPoints = 2 + f(2 * animLoop.progress) * maxPoints;

  translate(width / 2, height / 2);
  noFill();
  circle(0, 0, 2 * radius);

  fill(0);

  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let theta = map(i , 0, numPoints, 0, 2 * PI);
    points.push([radius * cos(theta), radius * sin(theta)]);
  }
  
  points.forEach(point => circle(...point, 12));

  for (let i = 0; i < numPoints; i++) {
    line(...points[i], ...points[(2 * i) % points.length]);
  }
}
