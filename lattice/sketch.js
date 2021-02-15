let phi = (1 + 5**0.5)/2;
let radius;
let numPoints = 40;
let initLineLength = 60;
let lineLength;

function f(x) {
  return atan(tan(x * PI / 2)**2) * 2 / PI;
}

function setup() {
  createCanvas(400, 400);
  radius = 0.5 * width / phi;

  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 3,
    gif:true,
    options: {quality: 1,
      workers: 7,
      width: width,
      height: height
    }
  });
  strokeWeight(3);
}

function squareCoord(i, j) {
  return [i * lineLength, j * lineLength];
}

function triangleCoord(i, j) {
  return [i * lineLength, j];
}

function convex(x, x_, lambda) {
  return lambda * x_ + (1 - lambda) * x;
}

function draw() {
  background(255);

  translate(width / 2, height - height / phi);

  rotate(PI / 4);
  line(0, 0, width, 0);
  line(0, 0, 0, height);

  lineLength = initLineLength / (1 + animLoop.progress);

  if (animLoop.progress < 1/3) {
    let lambda = 3 * animLoop.progress;
    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        line(...squareCoord(i, j), ...squareCoord(i + 1, j));
        line(...squareCoord(i, j), ...squareCoord(i, j + 1));
        line(...squareCoord(convex(i + 1, i, lambda) , j),
             ...squareCoord(i, j + 1));
      }
    }
  } else if (animLoop.progress < 2 / 3) {
    let lambda = 3 * (animLoop.progress - 1/3);
    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        if (i % 2 == 1)  {
          if (j % 2 == 0) {
            line(...squareCoord(convex(i, i+1, lambda), j),
                 ...squareCoord(i, j + 1));
          } else {
            line(...squareCoord(i, j),
                 ...squareCoord(convex(i, i-1, lambda), j + 1));
          }
        } else {
          line(...squareCoord(i, j),
               ...squareCoord(i, j + 1));
        }
        line(...squareCoord(i, j),
             ...squareCoord(i + 1, j));
      }
    }
  } else { 
    let lambda = 3 * (animLoop.progress - 2/3);
    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        if (i % 2 == 1)  {
          if (j % 2 == 0) {
            line(...squareCoord(i + 1, j),
                 ...squareCoord(i, j + 1));
          } else {
            line(...squareCoord(i, j),
                 ...squareCoord(i - 1, j + 1));
          }
        } else {
          line(...squareCoord(i, j),
               ...squareCoord(i, j + 1));
        }
        if (j % 2 == 1) {
          if (i % 2 == 0) {
            line(...squareCoord(i, convex(j, j+1, lambda)),
                 ...squareCoord(i + 1, j));
          } else {
            line(...squareCoord(i, j),
                 ...squareCoord(i + 1, convex(j, j-1, lambda)));
          }
        } else {
          line(...squareCoord(i, j),
               ...squareCoord(i + 1, j));
        }
      }
    }
  }
}
