let points = [];
let allPoints = [];
let side = 80;

function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 5,
    gif:true,
    options: {quality: 20,
      workers: 3,
      width: width,
      height: height
    }
  });
  strokeWeight(3);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let ratio = map(animLoop.progress, 0, 1, 1.2, 1);
  let t = map(animLoop.progress, 0, 1, sqrt(5), 10)**2;
  let numPoints = floor(t);

  points = [];
  allPoints = [];

  points.push([side, side]);
  points.push([side, -side]);
  points.push([-side, -side]);
  points.push([-side, side]);

  points.forEach(point => allPoints.push(point));

  line(...points[0], ...points[1]);
  line(...points[1], ...points[2]);
  line(...points[2], ...points[3]);
  line(...points[3], ...points[0]);

  for (let i = 0; i < numPoints; i++) {
    let [xi, yi] = points[points.length - 1];
    let [xf, yf] = points.shift();
    let newPoint = [xi + (xf-xi)*ratio, yi + (yf-yi)*ratio];
    // line(xi, yi, ...newPoint);
    points.push(newPoint);
    allPoints.push(newPoint);
  }

  for (let i = 0; i < numPoints - 2; i++) {
    line(...allPoints[i], ...allPoints[i+1]);
  }

  if (numPoints > 1) {
    let [xi, yi] = allPoints[numPoints-2];
    let [xf, yf] = allPoints[numPoints-1];
    line(xi, yi,
      (t % 1) * xf + (1 - t % 1) * xi, (t % 1) * yf + (1 - t % 1) * yi);
  }

}
