import React from "react";
import Challenge from "../../components/Challenge";
import sand from "../../assets/sand.png";
import gof from "../../assets/gof.png";

const Home = () => {
  return (
    <div>
      <h1>Coding Challenges with P5.js</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Challenge
          name={"Sand Falling Game"}
          info={"CelLular Automata to simmulate the behavior of sand"}
          img={sand}
          url={"/sand-falling"}
        />
        <Challenge
          name={"Conway's Game of Life"}
          info={"Cellular Automata designed by mathmatician John Horton Conway"}
          img={gof}
          url={"/game-of-life"}
        />
      </div>
    </div>
  );
};
export default Home;
