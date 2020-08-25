let phi = (1 + 5**0.5)/2;
let radius;
let maxPoints = 40;

function f(x) {
  return atan(tan(x * PI / 2)**2) * 2 / PI;
}

function setup() {
  createCanvas(150, 150);
  radius = 0.5 * width / phi;

  frameRate(20);
  createLoop({
    duration: 30,
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

  let numPoints = 2 + f(animLoop.theta) * maxPoints;

  translate(width / 2, height / 2);
  noFill();
  circle(0, 0, 2 * radius);

  fill(0);

  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let theta = map(i , 0, numPoints, 0, 2 * PI);
    points.push([radius * cos(theta), radius * sin(theta)]);
  }
  
  points.forEach(point => circle(...point, 4));

  for (let i = 0; i < numPoints; i++) {
    line(...points[i], ...points[(2 * i) % points.length]);
  }
}
