let L;
let LL;
let alpha = 4;

function setup() {
  createCanvas(720, 720);
  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 5,
    gif: true,
    options: {
      quality: 10,
      workers: 3,
      width: width,
      height: height
    }
  });

  L = width / 3;
  LL = L * sqrt(2);
  strokeWeight(width / 27);
}

function f(x) {
  return 2 / PI * atan((tan(x * PI / 2) ** alpha));
}

let scenes = [
  progress => {
    let topLeft = [-L / 2, -L / 2];
    let bottomLeft = [-L / 2, L / 2];
    let topRight = [L / 2, -L / 2];
    let bottomRight = [L / 2, L / 2];

    let theta1 = map(progress, 0, 1, PI / 2, 0);
    let theta2 = map(progress, 0, 1, 0, PI / 2);
    let point1 = [-L/2 + L * cos(theta1), -L/2 + L * sin(theta1)]
    let point2 = [L/2 - L * sin(theta2), L / 2 - L * cos(theta2)]

    line(...topLeft, ...bottomLeft);
    line(...topLeft, ...point1);
    line(...bottomLeft, ...point1);

    line(...topRight, ...bottomRight);
    line(...bottomRight, ...point2);
    line(...topRight, ...point2);
  },
  progress => {
    let p1 = [-L / 2, -L / 2];
    let p2 = [-L / 2, L / 2];
    let p3 = [L / 2, -L / 2];

    let q1 = p3;
    let q2 = p2;
    let q3 = [L / 2, L / 2];

    push();
    translate(0, -progress * L / 2);
    rotate(progress * PI / 4);
    line(...p1, ...p2);
    line(...p2, ...p3);
    line(...p3, ...p1);
    pop();

    push();
    translate(0, progress * L / 2);
    rotate(progress * PI / 4);
    line(...q1, ...q2);
    line(...q2, ...q3);
    line(...q3, ...q1);
    pop();
  },
  progress => {
    function triangle() {
      let theta1 = map(progress, 0, 1, -PI / 4, - 3 * PI / 2);
      let theta2 = map(progress, 0, 1, -PI + PI / 4, PI / 2);
      let p1 = [-LL / 2, -L / 2];
      let p2 = [LL / 2, -L / 2];
      let p3 = [-LL / 2 + L * cos(theta1), -L / 2 + L * sin(theta1)];
      let p4 = [LL / 2 + L * cos(theta2), -L / 2 + L * sin(theta2)];
      line(...p1, ...p3);
      line(...p1, ...p2);
      line(...p2, ...p4);
    }
    triangle();
    rotate(PI);
    triangle();
  },
  progress => {
    let p1 = [-LL / 2, -L / 2];
    let p2 = [-LL / 2, L / 2];

    let p3 = [LL / 2, -L / 2];
    let p4 = [LL / 2, L / 2];

    let q1 = [0, -L / 2]
    let q2 = [0, map(progress, 0, 1, -L / 2, L / 2)];

    line(...p1, ...p2);
    line(...p1, ...p3);

    line(...p3, ...p4);
    line(...p2, ...p4);

    line(...q1, ...q2);
  },
  progress => {
    let p1 = [-LL / 2, -L / 2];
    let p2 = [-LL / 2, L / 2];
    let p3 = [0, -L / 2];
    let p4 = [0, L / 2];

    function rectangle() {
      line(...p1, ...p2);
      line(...p3, ...p4);
      line(...p1, ...p3);
      line(...p2, ...p4);
    }

    push();
    translate(progress * LL / 4, 0);
    rectangle();
    pop();
    translate(map(progress, 0, 1, LL / 2, width), 0);
    rectangle();
  },
  progress => {
    let FF = map(progress, 0, 1, LL / 2, L);
    let F = map(progress, 0, 1, L, LL);
    let p1 = [-FF / 2, -F / 2];
    let p2 = [-FF / 2, F / 2];
    let p3 = [FF / 2, -F / 2];
    let p4 = [FF / 2, F / 2];

    rotate(progress * PI / 2);
    line(...p1, ...p2);
    line(...p3, ...p4);
    line(...p1, ...p3);
    line(...p2, ...p4);
  },
  progress => {
    let FF = map(progress, 0, 1, LL, L);
    
    let p1 = [-FF / 2, -L / 2];
    let p2 = [-FF / 2, L / 2];
    let p3 = [FF / 2, -L / 2];
    let p4 = [FF / 2, L / 2];

    let q3 = [map(progress, 0, 1, p3[0], p1[0]), -L / 2];
    let q2 = [map(progress, 0, 1, p2[0], p4[0]), L / 2];

    line(...p1, ...p2);
    line(...p3, ...p4);

    line(...p1, ...q3);
    line(...q2, ...p4);
  },
]

function draw() {
  background(255);
  translate(width / 2, height / 2);
  let index = Math.floor(animLoop.progress * scenes.length);
  let progress = f(map(animLoop.progress * scenes.length, index, index + 1, 0, 1));
  scenes[index](progress);
}

