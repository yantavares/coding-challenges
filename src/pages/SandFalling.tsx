import React, { useEffect, useRef } from "react";
import p5 from "p5";

const SandFalling = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let shapes = [];

      p.setup = () => {
        p.createCanvas(700, 400);
        // Initialize shapes
        for (let i = 0; i < 50; i++) {
          shapes.push({
            x: p.random(p.width),
            y: p.random(-500, -50),
            size: p.random(10, 20),
            speed: p.random(1, 5),
          });
        }
      };

      p.draw = () => {
        p.background(200);

        // Draw and update shapes
        shapes.forEach((shape) => {
          p.fill(255, 204, 0); // Example color
          p.ellipse(shape.x, shape.y, shape.size, shape.size);
          shape.y += shape.speed;

          // Reset shape to the top
          if (shape.y > p.height) {
            shape.y = p.random(-50, -10);
            shape.x = p.random(p.width);
          }
        });
      };
    };

    if (sketchRef.current === null) return;

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default SandFalling;
