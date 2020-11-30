function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 3,
    gif:true,
    options: {quality: 1,
      workers: 2,
      width: width,
      height: height
    }
  });
  noFill();
}

function n(index, radius, theta) {
  return noise(radius * sin(theta), radius * cos(theta), 5 * index);
}

function draw() {
  background(255);
  let numClocks = 6;
  let offset = 0;

  for (let j = 0; j < numClocks; j++) {
    for (let k = 0; k < numClocks; k++) {
      push();
      let clockRadius = n(offset, 0.5, animLoop.theta) 
        * min(width, height) / numClocks;
      let x = map(j, -1, numClocks, 0, width);
      let y = map(k, -1, numClocks, 0, height);

      let angle1 = 4 * PI * n(offset + 1, 1, animLoop.theta);
      let minLength = 0.9 * clockRadius * n(offset + 2, 1, animLoop.theta);
      let hourLength = 0.8 * minLength;
      let angle2 = 2 * angle1
      let clockRotation = 3 * PI * n(offset + 3, 0.5, animLoop.theta);

      let ticks = [];
      let total = 0;
      for (let i = 0; i < 12; i++) {
        ticks.push(total);
        total += n(offset + 4 + i, 1, animLoop.theta); 
      }
      offset += 15;

      ticks = ticks.map(x => x / total);
      translate(x, y);
      rotate(clockRotation);
      strokeWeight(clockRadius / 10);

      for (let i = 0; i < 12; i++) {
        let tickAngle = 2 * PI * ticks[i];
        line(clockRadius * cos(tickAngle),
          clockRadius * sin(tickAngle),
          0.8 * clockRadius * cos(tickAngle),
          0.8 * clockRadius * sin(tickAngle))
      }

      ellipse(0, 0, 2 * clockRadius);

      line(0, 0, hourLength * sin(angle1), hourLength * cos(angle1));
      line(0, 0, hourLength * sin(angle2), hourLength * cos(angle2));
      pop();
    }
  }
}
