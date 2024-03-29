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
  InfoDisplayContentYellow,
  InfoDisplayContentRed,
  NewBestText,
} from "./styles";
import Visualizer from "./classes/visualizer.js";
import { NeuralNetwork } from "./classes/network";

let learningRate = 0.5;
let bestCar: Car = null;
const AIAmount = 50;

const CarNN = () => {
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const [toggleReload, setToggleReload] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [bestDistance, setBestDistance] = useState(0);
  const [bestGlobalDistance, setBestGlobalDistance] = useState(0);
  const [generation, setGeneration] = useState(1);
  const [allCarsCrashed, setAllCarsCrashed] = useState(false);

  const generateTraffic = (road: Road) => {
    return [
      new Car(road.getLaneCenter(0), 300, 30, 50, "NPC", 3.2),
      new Car(road.getLaneCenter(1), 300, 30, 50, "NPC", 3.2),
      new Car(road.getLaneCenter(2), 300, 30, 50, "NPC", 3.2),

      new Car(road.getLaneCenter(1), -100, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(0), -300, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -300, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(1), -500, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -500, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(0), -650, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(0), -800, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(2), -800, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(1), -950, 30, 50, "NPC", 2),

      new Car(road.getLaneCenter(0), -1100, 30, 50, "NPC", 2),
      new Car(road.getLaneCenter(1), -1100, 30, 50, "NPC", 2),
    ];
  };

  function saveBestCar() {
    if (bestCar && bestCar.brain && -bestCar.y > bestGlobalDistance) {
      localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
      console.log("Best brain saved!");
    }
  }

  function resetAll() {
    if (localStorage.getItem("bestBrain")) {
      setGeneration(1);
      setBestDistance(0);
      setBestGlobalDistance(0);
      setToggleReload(!toggleReload);
      localStorage.clear();
    } else {
      alert("No best brain found");
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0 || allCarsCrashed) {
          saveBestCar();
          setToggleReload((prev) => !prev);
          setGeneration((prevGen) => prevGen + 1);
          return 20;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [allCarsCrashed]);

  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;

    if (carCanvas && networkCanvas) {
      carCanvas.width = 200;
      networkCanvas.width = 500;

      const carCtx = carCanvas.getContext("2d");
      const networkCtx = networkCanvas.getContext("2d");

      const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
      const cars = generateCars(AIAmount);

      let traffic = generateTraffic(road);

      if (generation % 2 === 0 || bestDistance > bestGlobalDistance + 500) {
        if (learningRate > 0.15)
          learningRate = Number((learningRate - 0.1).toPrecision(1));
      }

      console.log("Generation: ", generation, " learning rate: ", learningRate);

      if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
          cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
          if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, learningRate);
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
        setAllCarsCrashed(false);

        if (generation === 1) {
          setBestGlobalDistance(0);
          setBestDistance(0);
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

        if (cars.every((car: Car) => car.damaged)) {
          setAllCarsCrashed(true);
        }

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
          <h4>
            Countdown:
            <InfoDisplayContentRed>{countdown}s</InfoDisplayContentRed>
          </h4>
          <h4 style={{ width: "100%" }}>
            Current Distance:
            <InfoDisplayContentYellow>
              {bestDistance < 0 ? 0.0 : bestDistance.toFixed(1)}
            </InfoDisplayContentYellow>
            {bestDistance > bestGlobalDistance && (
              <NewBestText>(New best!)</NewBestText>
            )}
          </h4>
          <h4>
            Best Distance:
            <InfoDisplayContentYellow>
              {bestGlobalDistance.toFixed(1)}
            </InfoDisplayContentYellow>
          </h4>
          <h4>
            Generation:
            <InfoDisplayContentYellow>{generation}</InfoDisplayContentYellow>
          </h4>
          <ButtonsContainer>
            <button onClick={resetAll}>Reset brain</button>
          </ButtonsContainer>
        </InfoDisplay>
      </MainContainer>
      <NetworkCanvas ref={networkCanvasRef} />
    </CanvasContainer>
  );
};

export default CarNN;
