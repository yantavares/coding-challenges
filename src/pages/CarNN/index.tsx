import React, { useRef, useEffect } from "react";
import Car from "./classes/car";
import Road from "./classes/road";
import { CarCanvas, CanvasContainer, NetworkCanvas } from "./styles";

const CarNN = () => {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);

  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    if (carCanvas) {
      carCanvas.width = 200;

      const carCtx = carCanvas.getContext("2d");

      const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
      const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
      const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2)];

      animate();

      function animate() {
        traffic.forEach((car) => {
          car.update(road.borders);
        });
        car.update(road.borders, traffic);
        carCanvas.height = window.innerHeight;

        carCtx.save();
        carCtx.translate(0, -car.y + window.innerHeight * 0.7);

        road.draw(carCtx);

        traffic.forEach((car) => {
          car.draw(carCtx, "red");
        });

        car.draw(carCtx);

        carCtx.restore();
        requestAnimationFrame(animate);
      }
    }
  }, []);

  useEffect(() => {
    const networkCanvas = networkCanvasRef.current;
    if (networkCanvas) {
      networkCanvas.width = 200;
      networkCanvas.height = 200;
    }
  }, []);

  return (
    <CanvasContainer>
      <CarCanvas ref={carCanvasRef} />
      <NetworkCanvas ref={networkCanvasRef} />
    </CanvasContainer>
  );
};

export default CarNN;
