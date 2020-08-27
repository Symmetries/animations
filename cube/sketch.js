const B = [0, 1];
let phi = (1 + 5**0.5)/2;
let side;

function cubeToCanvas(x, y, z) {
  return [map(x, -1, 1, -side / 2, side / 2),
          map(y, -1, 1, -side / 2, side / 2)];
}

function initCube(initFunc) {
  let coords = [];
  for (let i of B) {
    let currentI = [];
    for (let j of B) {
      let currentJ = []
      for (let k of B) {
        currentJ.push(initFunc(i, j, k));
      }
      currentI.push(currentJ);
    }
    coords.push(currentI);
  }
  return coords;
}

function circleCoords(theta, phi) {
  return initCube((i, j, k) => {
    let diagonal = side / sqrt(2);
    let r = k == 1 ? diagonal / 2 : diagonal;
    let offset = k == 1 ? theta : phi;
    let angle = i == 1 ? 
      (j == 1 ? 0 : PI / 2)
      :
      (j == 1 ? 3 * PI / 2 : PI); // hardcoded due to smol brain
    angle += offset;
    return [r * cos(angle), r * sin(angle)];
  });
}

function cubeCoords(theta, phi) {
  let coords = initCube((i, j, k) => [i, j, k].map(x => x == 1 ? 1 : -1));

  for (let i of B) {
    for (let j of B) {
      for (let k of B) {
        let [x, y, z] = coords[i][j][k];
        coords[i][j][k] = [
          cos(theta) * x + sin(theta) * z,
          y,
          -sin(theta) * x + cos(theta) * z
        ];
        [x, y, z] = coords[i][j][k];
        coords[i][j][k] = [
          x,
          cos(phi) * y - sin(phi) * z,
          sin(phi) * y + cos(phi) * z
        ];
      }
    }
  }

  return coords;
} 

function convex(p1, p2, lambda) {
  let res = [];
  for (let i = 0; i < 2; i++) {
    res.push(p1[i] * lambda + p2[i] * (1 - lambda));
  }
  return res;
}

function setup() {
  createCanvas(300, 300);
  frameRate(30);
  side = width / phi;
  createLoop({
    duration: 8,
    gif:true,
    options: {quality: 1,
      workers: 3,
      width: width,
      height: height
    }
  });
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  fill(0);
  strokeWeight(5);

  let theta = 4 * animLoop.theta;
  let phi = sin(3 * animLoop.theta) / 2;
  let lambda = map(sin(animLoop.theta), -1, 1, 0, 1);
  let p1s = cubeCoords(theta, phi);
  let p2s = circleCoords(theta, phi);
  let ps = initCube((i, j, k) =>
    convex(cubeToCanvas(...p1s[i][j][k]), p2s[i][j][k], lambda));
  
  for (let i of B) {
    for (let j of B) {
      for (let k of B) {
        circle(...ps[i][j][k], 20);
      }
    }
  }

  for (let i of B) {
    for (let j of B) {
      for (let k of B) {
        line(...ps[i][j][k], ...ps[1-i][j][k]);
        line(...ps[i][j][k], ...ps[i][1-j][k]);
        line(...ps[i][j][k], ...ps[i][j][1-k]);
      }
    }
  }
}
