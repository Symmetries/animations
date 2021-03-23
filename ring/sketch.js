let radius;
let alpha = 4;

function setup() {
  createCanvas(720, 720);
  frameRate(60);
  pixelDensity(1);
  createLoop({
    duration: 3,
    gif: true,
    render: false,
    open: true,
    options: {
      quality: 10,
      workers: 2,
      width: width,
      height: height
    },
  });
  strokeWeight(width / 100);
  radius = width * 3 / 4;
}

function f(x) {
  return 2 / PI * atan((tan(x * PI / 2) ** alpha));
}

function draw() {
  background(255);

  let scenes = [scene1, scene2, scene3, scene4]
  let index = Math.floor(animLoop.progress * scenes.length);
  scenes[index](f(map(animLoop.progress * scenes.length, index, index + 1, 0, 1)));
}

function scene1(progress) {
  let theta = progress * 2 * PI;
  let dx = radius * sin(theta / 4) / 2;
  let dy = radius * cos(theta / 4) / 2;
  line(width / 2, height / 2, width / 2 - dx, height / 2 - dy);
  line(width / 2, height / 2, width / 2 + dx, height / 2 + dy);
}

function scene2(progress) {
  let theta = progress * 2 * PI;
  ellipse(width / 2, height / 2, radius, radius * sin(theta / 4));
  ellipse(width / 2, height / 2, radius / 2, radius / 2 * sin(theta / 4));
  point(width / 2 + radius / 2, height / 2);
  point(width / 2 - radius / 2, height / 2);
  point(width / 2, height / 2 + radius / 2 * sin(theta / 4));
  point(width / 2, height / 2 - radius / 2 * sin(theta / 4));
}

function scene3(progress) {
  let theta = progress * 2 * PI;
  ellipse(width / 2, height / 2, radius * cos(theta / 4), radius);
  ellipse(width / 2, height / 2, radius / 2 * cos(theta / 4), radius / 2);
  point(width / 2, height / 2 + radius / 2);
  point(width / 2, height / 2 - radius / 2);
  point(width / 2 - radius / 2 * cos(theta / 4), height / 2);
  point(width / 2 + radius / 2 * cos(theta / 4), height / 2);
}

function scene4(progress) {
  let theta = progress * 2 * PI;
  ellipse(width / 2, height / 2, radius * cos(PI / 2 + theta / 2), radius);
  point(width / 2, height / 2 + radius / 2);
  point(width / 2, height / 2 - radius / 2);
  point(width / 2 + radius / 2 * cos(PI / 2 + theta / 2), height / 2);
  point(width / 2 - radius / 2 * cos(PI / 2 + theta / 2), height / 2);
}
