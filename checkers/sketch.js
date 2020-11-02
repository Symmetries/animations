function setup() {
  createCanvas(400, 400);
  frameRate(60);
  createLoop({
    duration: 3,
    gif:true,
    options: {quality: 1,
      workers: 1,
      width: width,
      height: height
    }
  });
  noStroke();
  fill(255);
}

function draw() {
  blendMode(REPLACE);
  background(255);
  blendMode(DIFFERENCE);
  let total = 8
  let n = (1 + animLoop.progress) * total / 2;

  let h = (animLoop.progress + 1) * height;
  for (let i = 0; i < total; i++) {
    push();
    translate(i * width / n, height / 2);
    if (i % 2 == 1) {
      let angle = constrain(total / 2 * animLoop.progress * PI / 2 
                            - ((i-1) / 2) * PI / 2,
                            0, PI / 2);
      rotate(angle);
    }
    translate(-i * width / n, -h / 2);
    rect(i * width / n, -h, 2 * width, 3 * h);
    pop();
  }

  for (let i = 0; i < n + 1; i++) {
    rect(0, i * h / n, width, h);
  }
}
