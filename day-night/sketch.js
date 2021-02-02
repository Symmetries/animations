let windowPaneSize = 75;
let windowGapSize = 10;
let outerWindowGap = 20;

let innerSide = windowGapSize / 2 + windowPaneSize;
let outerSide = innerSide + outerWindowGap;

let alpha = 4;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  pixelDensity(1);
  createLoop({
    duration: 5,
    gif: true,
    options: {quality: 1,
      workers: 1,
      width: width,
      height: height,
    }
  });
  strokeWeight(3);
}

function f(x) {
  return 2 / PI * atan(abs(tan(x * PI))**alpha);
}

function draw() {
  blendMode(BLEND);
  background(255);
  translate(width / 2, height / 2);

  let theta = animLoop.progress < 0.5 ? PI * f(animLoop.progress) : PI + PI * f(animLoop.progress - 0.5);

  drawSun(theta);
  drawMoon(theta);
  drawWindows();
  drawNight(theta);
}

function drawWindows() {
  fill(255);
  stroke(255);
  rect(innerSide, -height / 2, width / 2 - innerSide, height);
  rect(-width / 2, -height / 2, width / 2 - innerSide, height);
  rect(-width / 2, -height / 2, width, height / 2 - innerSide);
  rect(-width / 2, innerSide, width, height / 2 - innerSide);

  rect(-windowGapSize / 2, -height / 2, windowGapSize, height);
  rect(-width / 2, -windowGapSize / 2, width, windowGapSize);

  noFill();
  stroke(0);
  square(windowGapSize / 2, -windowGapSize / 2 - windowPaneSize, windowPaneSize)
  square(windowGapSize / 2, windowGapSize / 2, windowPaneSize)
  square(-windowGapSize / 2 - windowPaneSize, windowGapSize / 2, windowPaneSize)
  square(-windowGapSize / 2 - windowPaneSize, -windowGapSize / 2 - windowPaneSize, windowPaneSize)
  square(-outerSide, -outerSide, 2 * outerSide);

}

function drawSun(theta) {
  push();
  translate(0, height / 2);
  stroke(0);
  fill(0);
  rotate(theta);
  translate(-windowPaneSize / 2 - windowGapSize / 2,
            -height / 2 - windowPaneSize / 2);
  circle(0, 0, 40);
  pop();
}

function drawMoon(theta) {
  push();
  translate(0, height / 2);
  stroke(0);
  fill(0);
  rotate(theta + PI);
  translate(windowPaneSize / 2 + windowGapSize / 2,
            -height / 2 - windowPaneSize / 2);
  circle(0, 0, 40);
  pop();
}

function drawNight(theta) {
  push();
  blendMode(DIFFERENCE);
  noStroke();
  fill(255);
  translate(0, height / 2);
  rotate(theta);
  rect(-2*width, 0, 4 * width, 5 * height);
  pop();
}
