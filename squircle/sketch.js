let n = 200;

let square;
let circle;
let squircle;

function convex(p1, p2, lambda) {
  return [
    lambda * p1[0] + (1-lambda) * p2[0],
    lambda * p1[1] + (1-lambda) * p2[1]
  ];

}

function computeSquarePoints(side) {
  square = [];
  for (let i = 0; i < n; i++) {
    let x;
    let y;

    if (i < n / 4) {
      y = side;
      x = map(i, 0, n / 4, side, -side);
    } else if (i < n / 2) {
      x = -side;
      y = map(i, n / 4, n / 2, side, -side);
    } else if (i < 3 * n / 4) {
      y = -side;
      x = map(i, n / 2, 3 * n / 4, -side, side);
    } else {
      x = side;
      y = map(i, 3 * n / 4, n, -side, side);
    }
    square.push([x, y]);
  }
}

function computeCirclePoints(r) {
  circle = [];
  for (let i = 0; i < n; i++) {
    let angle = map(i, 0, n, 0, 2 * PI) + PI / 4;
    circle.push([r * cos(angle), r * sin(angle)]);
  }
}

function computeSquirclePoints(side, r, lambda) {
  computeSquarePoints(side);
  computeCirclePoints(r);

  squircle = [];

  for (let i = 0; i < n; i++) {
    squircle.push(convex(square[i], circle[i], lambda));
  }
}

function f(x) {
  return 2 / PI * atan((tan(x * PI))**4);
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 3,
    gif:true,
    options: {quality: 10,
      workers: 7,
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
  rotate(2 * PI * f(animLoop.progress < 0.5 ? animLoop.progress : animLoop.progress - 0.5))
  computeSquirclePoints(100, 100, 1-f(animLoop.progress));

  beginShape();
  squircle.forEach(point => vertex(...point));
  endShape(CLOSE);
}
