import p5 from "p5";
import React, { useEffect, useRef } from "react";

const Template = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(560, 560);
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);
      };

      if (sketchRef.current === null) return;

      let myp5 = new p5(sketch, sketchRef.current);

      return () => {
        myp5.remove();
      };
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default Template;
