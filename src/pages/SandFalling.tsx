import React, { useEffect, useRef } from "react";
import p5 from "p5";

const SandFalling = (props) => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(700, 400);
      };

      p.draw = () => {
        p.background(200);
        p.ellipse(p.width / 2, p.height / 2, 70, 70);
        // ... more drawing code ...
      };

      // Other p5.js methods...
    };

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, []); // Empty dependency array ensures this runs once

  return <div ref={sketchRef}></div>;
};

export default SandFalling;
