import React, { useRef, useEffect } from "react";
import Car from "./classes/car";
import Road from "./classes/road";
import { Canvas, CanvasContainer } from "./styles";

const CarNN = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 200;

      const ctx = canvas.getContext("2d");

      const road = new Road(canvas.width / 2, canvas.width * 0.9);
      const car = new Car(road.getLaneCenter(1), 100, 30, 50, "PLAYER");
      const traffic = [new Car(road.getLaneCenter(2), -100, 30, 50, "NPC", 2)];

      animate();

      function animate() {
        traffic.forEach((car) => {
          car.update(road.borders);
        });
        car.update(road.borders);
        canvas.height = window.innerHeight;

        ctx.save();
        ctx.translate(0, -car.y + window.innerHeight * 0.7);

        road.draw(ctx);

        traffic.forEach((car) => {
          car.draw(ctx);
        });

        car.draw(ctx);

        ctx.restore();
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
