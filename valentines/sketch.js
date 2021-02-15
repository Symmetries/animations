let kanjiStrokes;
let heartStrokes;

let alpha = 6;
let beta = 0.25;

function convex(p1, p2, lambda) {
  return [
    lambda * p1[0] + (1 - lambda) * p2[0],
    lambda * p1[1] + (1 - lambda) * p2[1]
  ];
}

function f(x) {
  return 2 / PI * atan(abs(tan(x * PI))**alpha);
}

function g(x) {
  return (1 - 4**beta * (f(x) * (1 - f(x))) ** beta) * sin(8 * PI * x)**2;
}

function convexStroke(lambda) {
  let res = [];

  for (let i = 0; i < kanjiStrokes.length; i++) {
    let cur = [];
    for (let j = 0; j < kanjiStrokes[i].length; j++) {
      cur.push(convex(kanjiStrokes[i][j], heartStrokes[i][j], lambda));
    }
    res.push(cur);
  }
  return res;
}

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 8,
    gif: true,
    options: {quality: 1,
      workers: 3,
      width: width,
      height: height
    }
  });
  noFill();

  kanjiStrokes = [
    [
      [-width / 3, height / 5],
      [-width / 3, height / 5],
      [-width / 4, 0],
      [-width / 4, -height / 8]
    ],
    [
      [width / 3, height / 5],
      [width / 3, height / 5],
      [width / 4, 0],
      [width / 4, -height / 8 ]
    ],
    [
      [-width / 6, -height / 4],
      [-width / 6, height / 4],
      [width / 6, height / 4],
      [width / 6, 0],
    ],
    [
      [-width / 7, -height / 3],
      [-width / 7, -height / 3],
      [-width / 7 + width / 10, -height / 3.5],
      [width / 7, -height / 4],
    ]
  ]

  heartStrokes = [
    [
      [0, -height / 4 + height / 12],
      [-width / 6, -height / 2.5 + height / 12],
      [-width / 3, -height / 5 + height / 12],
      [0, height / 3 + height / 12]
    ],
    [
      [0, -height / 4 + height / 12],
      [width / 6, -height / 2.5 + height / 12],
      [width / 3, -height / 5 + height / 12],
      [0, height / 3 + height / 12]
    ],
    [
      [0, -height / 4 + height / 12],
      [-width / 6, -height / 2.5 + height / 12],
      [-width / 3, -height / 5 + height / 12],
      [0, height / 3 + height / 12]
    ],
    [
      [0, -height / 4 + height / 12],
      [width / 6, -height / 2.5 + height / 12],
      [width / 3, -height / 5 + height / 12],
      [0, height / 3 + height / 12]
    ],
  ];
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  scale(1 + 0.05 * g(animLoop.progress))
  strokeWeight(15 + 10 * g(animLoop.progress));

  let lambda = f(animLoop.progress);
  drawStrokes(convexStroke(lambda));
}

function drawStrokes(strokes) {
  strokes.forEach(stroke => {
    beginShape();
    curveVertex(...stroke[0]);
    stroke.forEach(point => {
      curveVertex(...point);
    });
    curveVertex(...stroke[stroke.length-1]);
    endShape();
  });
}
