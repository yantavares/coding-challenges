import React, { useRef, useEffect, useState } from "react";
import Car from "./classes/car";
import Road from "./classes/road";
import {
  CarCanvas,
  CanvasContainer,
  NetworkCanvas,
  ButtonsContainer,
  MainContainer,
  InfoDisplay,
} from "./styles";
import Visualizer from "./classes/visualizer.js";
import { NeuralNetwork } from "./classes/network";

const CarNN = () => {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const [toggleReload, setToggleReload] = useState(false);
  const [countdown, setCountdown] = useState(12);
  const [bestDistance, setBestDistance] = useState(0);
  const [bestGlobalDistance, setBestGlobalDistance] = useState(0);
  const [generation, setGeneration] = useState(1);

  let bestCar: Car;

  const generateTraffic = (road: Road) => {
    return [
      new Car(road.getLaneCenter(0), 380, 30, 50, "NPC", 3.2),
      new Car(road.getLaneCenter(1), 380, 30, 50, "NPC", 3.2),
      new Car(road.getLaneCenter(2), 380, 30, 50, "NPC", 3.2),

      new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(0), -300, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -300, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(1), -500, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -500, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(0), -800, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -800, 30, 50, "NPC", 2),
    ];
  };

  function saveBestCar() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          saveBestCar();
          setToggleReload((prev) => !prev);
          setGeneration((prevGen) => prevGen + 1);
          return 12;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;

    if (carCanvas && networkCanvas) {
      carCanvas.width = 200;
      networkCanvas.width = 500;

      const carCtx = carCanvas.getContext("2d");
      const networkCtx = networkCanvas.getContext("2d");

      const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
      const cars = generateCars(200);
      bestCar = cars[0];

      let traffic = generateTraffic(road);

      if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
          cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
          if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.12);
          }
        }
      }

      function generateCars(n: number) {
        const cars = [];
        for (let i = 0; i < n; i++) {
          cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
        }
        return cars;
      }

      function animate(time = null) {
        if (time % 10000 === 0) {
          traffic.push(...generateTraffic(road));
        }

        traffic.forEach((car) => {
          car.update(road.borders);
        });

        for (let i = 0; i < cars.length; i++) {
          cars[i].update(road.borders, traffic);
        }

        bestCar = cars.find(
          (car: Car) => car.y === Math.min(...cars.map((c: Car) => c.y))
        );
        setBestDistance(-bestCar.y);

        if (bestGlobalDistance < bestDistance) {
          setBestGlobalDistance(bestDistance);
        }

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

      animate();
    }
  }, [toggleReload]);

  return (
    <CanvasContainer>
      <MainContainer>
        <CarCanvas ref={carCanvasRef} />
        <InfoDisplay>
          <p>Countdown: {countdown}s</p>
          <p style={{ width: "100%" }}>
            Current Distance: {bestDistance < 0 ? 0.0 : bestDistance.toFixed(1)}
          </p>
          <p>Best Distance: {bestGlobalDistance.toFixed(1)} </p>
          <p>Generation: {generation}</p>
          <ButtonsContainer></ButtonsContainer>
        </InfoDisplay>
      </MainContainer>
      <NetworkCanvas ref={networkCanvasRef} />
    </CanvasContainer>
  );
};

export default CarNN;
