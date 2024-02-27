import React, { useRef, useEffect } from "react";
import Car from "./classes/car";
import Road from "./classes/road";
import { CarCanvas, CanvasContainer, NetworkCanvas } from "./styles";
import Visualizer from "./classes/visualizer.js";

const CarNN = () => {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);

  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;

    if (carCanvas && networkCanvas) {
      carCanvas.width = 200;
      networkCanvas.width = 500;

      const carCtx = carCanvas.getContext("2d");
      const networkCtx = networkCanvas.getContext("2d");

      const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

      const cars = generateCars(100);

      const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2)];

      animate();

      function generateCars(n) {
        const cars = [];
        for (let i = 0; i < n; i++) {
          cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
        }
        return cars;
      }

      function animate(time = null) {
        traffic.forEach((car) => {
          car.update(road.borders);
        });

        for (let i = 0; i < cars.length; i++) {
          cars[i].update(road.borders, traffic);
        }

        carCanvas.height = window.innerHeight;
        networkCanvas.height = window.innerHeight;

        carCtx.save();
        carCtx.translate(0, -cars[0].y + window.innerHeight * 0.7);

        road.draw(carCtx);

        traffic.forEach((car) => {
          car.draw(carCtx, "red");
        });

        carCtx.globalAlpha = 0.2;

        for (let i = 0; i < cars.length; i++) {
          cars[i].draw(carCtx, "blue");
        }

        carCtx.globalAlpha = 1;

        carCtx.restore();
        networkCtx.lineDashOffset = -time / 100;

        Visualizer.drawNetwork(networkCtx, cars[0].brain);

        requestAnimationFrame(animate);
      }
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
