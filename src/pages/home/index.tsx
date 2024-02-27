import React from "react";
import Challenge from "../../components/Challenge";
import sand from "../../assets/sand.png";
import gof from "../../assets/gof.png";
import maze from "../../assets/maze.png";
import carNN from "../../assets/carNN.png";
import {
  ChallengesContainer,
  HomeContainer,
  Language,
  MainHeader,
  WholePage,
} from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <MainHeader>
        Coding Challenges with <Language>TypeScript</Language>
      </MainHeader>
      <WholePage>
        <ChallengesContainer>
          <Challenge
            name={"Maze Solving Playground"}
            info={
              "Showcase of many algorithms designed to solve mazes such as DFS, BFS and A*"
            }
            img={maze}
            url={"maze-playground"}
          />
          <Challenge
            name={"Conway's Game of Life"}
            info={
              "Cellular Automata designed by mathmatician John Horton Conway"
            }
            img={gof}
            url={"/game-of-life"}
          />
          <Challenge
            name={"Self Driving Car with NN"}
            info={
              "Car that learns to drive in real time using a simple neural network and genetic alg."
            }
            img={carNN}
            url={"carNN"}
          />
          <Challenge
            name={"Sand Falling Game"}
            info={"Cellular Automata to simmulate the behavior of sand"}
            img={sand}
            url={"/sand-falling"}
          />
        </ChallengesContainer>
      </WholePage>
    </HomeContainer>
  );
};
export default Home;
