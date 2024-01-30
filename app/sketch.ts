import P5 from "p5";

const sketch = (p5: P5) => {
  let x = 100;
  let y = 100;
  let angle = 0;

  p5.setup = () => {
    const canvas = p5.createCanvas(600, 400);
    canvas.parent("app");
    p5.background(255);
  };

  p5.draw = () => {
    p5.background(255);

    // Draw a moving ellipse
    p5.fill(255, 0, 0);
    p5.ellipse(x, y, 50, 50);
    x += 2;
    if (x > p5.width) x = 0;

    // Draw a rotating rectangle
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(angle);
    p5.fill(0, 0, 255);
    p5.rect(-25, -25, 50, 50);
    p5.pop();
    angle += 0.05;

    // Draw a static triangle
    p5.fill(0, 255, 0);
    p5.triangle(300, 100, 320, 100, 310, 80);

    // Interactive circle changes color on mouse press
    if (p5.mouseIsPressed) {
      p5.fill(0);
    } else {
      p5.fill(255);
    }
    p5.circle(350, 200, 50);
  };
};

new P5(sketch);
