import React from "react";
import Challenge from "../../components/Challenge";
import sand from "../../assets/sand.png";
import gof from "../../assets/gof.png";
import maze from "../../assets/maze.png";

const Home = () => {
  return (
    <div>
      <h1>Coding Challenges with TS</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Challenge
          name={"Sand Falling Game"}
          info={"Cellular Automata to simmulate the behavior of sand"}
          img={sand}
          url={"/sand-falling"}
        />
        <Challenge
          name={"Conway's Game of Life"}
          info={"Cellular Automata designed by mathmatician John Horton Conway"}
          img={gof}
          url={"/game-of-life"}
        />
        <Challenge
          name={"Maze Solving Playground"}
          info={
            "Showcase of many algorithms designed to solve mazes such as DFS, BFS and A*"
          }
          img={maze}
          url={"maze-playground"}
        />
      </div>
    </div>
  );
};
export default Home;
