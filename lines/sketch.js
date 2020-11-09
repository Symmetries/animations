function f(x) {
  return 2 * atan(tan(PI * x / 2)**2) / PI;
}

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 5,
    gif:true,
    options: {quality: 1,
      workers: 3,
      width: width,
      height: height
    }
  });
  strokeWeight(10);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let r = 100;
  // p0: [-100, -100]
  // p2: [100, -100]
  // p1: [-100, 100]
  // p3: [-100, -100]

  let theta = f(animLoop.progress) * PI;

  let xs = [-100, 100, 100, -100];
  let ys = [-100, -100, 100, 100];

  for (let j = 1; j <= 4; j++) {
    for (let i = 1; i <= 4; i++) {
      let p0 = [
        xs[i % 4] + (5 - j) * 20 * sin((i + j) % 4 * theta),
        ys[i % 4] + j * 20 * sin((i - j) % 4 * theta)
      ];

      let p1 = [
        xs[(i + 1) % 4] + j * 20 * sin((i + j) % 4 * theta),
        ys[(i + 1) % 4] + (5 - j) * 20 * sin((i - j) % 4 * theta)
      ];

      line(...p0, ...p1);
    }
  }
}
