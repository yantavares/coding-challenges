import React, { useRef, useEffect } from "react";
import Car from "./car";

const CarNN = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 200;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "gray";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stripeWidth = 5;
      const stripeHeight = 30;
      const spaceBetweenStripes = 50;
      ctx.fillStyle = "yellow";

      // Drawing lane stripes
      for (
        let y = 0;
        y < canvas.height;
        y += stripeHeight + spaceBetweenStripes
      ) {
        const x = canvas.width / 2 - stripeWidth / 2;
        ctx.fillRect(x, y, stripeWidth, stripeHeight);
      }
      const car = new Car(100, 100, 30, 50);
      car.draw(ctx);
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CarNN;
