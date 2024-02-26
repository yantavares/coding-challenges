import React, { useRef, useEffect } from "react";
import Car from "./car";
import { Canvas, CanvasContainer } from "./styles";

const CarNN = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 200;

      const ctx = canvas.getContext("2d");

      function drawCanvas() {
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
      }

      const car = new Car(100, 100, 30, 50);

      animate();

      function animate() {
        car.update();
        canvas.height = window.innerHeight;
        drawCanvas();

        car.draw(ctx);
        requestAnimationFrame(animate);
      }
    }
  }, []);

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

export default CarNN;
