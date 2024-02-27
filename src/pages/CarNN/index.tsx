import React, { useRef, useEffect, useState } from "react";
import Car from "./classes/car";
import Road from "./classes/road";
import {
  CarCanvas,
  CanvasContainer,
  NetworkCanvas,
  ButtonsContainer,
} from "./styles";
import Visualizer from "./classes/visualizer.js";
import { NeuralNetwork } from "./classes/network";

const CarNN = () => {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const [toggleReload, setToggleReload] = useState(false);

  let bestCar: Car;

  function saveBestCar() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
    alert("Best car saved");
  }

  function discardBestCar() {
    if (localStorage.getItem("bestBrain")) {
      localStorage.removeItem("bestBrain");
      alert("Best car discarded");
    } else alert("No best car to discard");
  }

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

      bestCar = cars[0];

      if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
          cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
          if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.15);
          }
        }
      }

      const traffic = [
        new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(0), -300, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(2), -300, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(1), -500, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(2), -500, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(0), -800, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(2), -800, 30, 50, "NPC", 2),
        new Car(road.getLaneCenter(1), -1000, 30, 50, "NPC", 2),
      ];

      animate();

      function generateCars(n: number) {
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

        bestCar = cars.find(
          (car: Car) => car.y === Math.min(...cars.map((c: Car) => c.y))
        );

        carCanvas.height = window.innerHeight;
        networkCanvas.height = window.innerHeight;

        carCtx.save();
        carCtx.translate(0, -bestCar.y + window.innerHeight * 0.7);

        road.draw(carCtx);

        traffic.forEach((car) => {
          car.draw(carCtx, "red");
        });

        carCtx.globalAlpha = 0.2;

        for (let i = 0; i < cars.length; i++) {
          cars[i].draw(carCtx, "blue");
        }

        carCtx.globalAlpha = 1;
        bestCar.draw(carCtx, "green", true);

        carCtx.restore();
        networkCtx.lineDashOffset = -time / 100;

        Visualizer.drawNetwork(networkCtx, bestCar.brain);

        requestAnimationFrame(animate);
      }
    }
  }, [toggleReload]);

  return (
    <CanvasContainer>
      <CarCanvas ref={carCanvasRef} />
      <ButtonsContainer>
        <button onClick={saveBestCar}>Save Best Car</button>
        <button onClick={discardBestCar}>Discard Best Car</button>
        <button onClick={() => setToggleReload(!toggleReload)}>Reload</button>
      </ButtonsContainer>
      <NetworkCanvas ref={networkCanvasRef} />
    </CanvasContainer>
  );
};

export default CarNN;
