import React from "react";
import {
  Button,
  ButtonContainer,
  ButtonInfoContainer,
  InfoLink,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const AlgSelector = ({ algorithm, setAlgorithm, isRunning }) => {
  const handleOptionChange = (event: any) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Select solving algorithm</h3>
      <ButtonContainer>
        <p>Graph Search</p>
        <ButtonInfoContainer>
          <Button
            style={
              algorithm === "DFS"
                ? { border: "1px solid blue" }
                : { border: "none" }
            }
            onClick={handleOptionChange}
            value={"DFS"}
            disabled={isRunning}
          >
            DFS
          </Button>
          <InfoLink
            href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              title="Learn More"
              style={{ cursor: "pointer" }}
              icon={faCircleInfo}
            />
          </InfoLink>
        </ButtonInfoContainer>
        <ButtonInfoContainer>
          <Button
            style={
              algorithm === "BFS"
                ? { border: "1px solid blue" }
                : { border: "none" }
            }
            onClick={handleOptionChange}
            value={"BFS"}
            disabled={isRunning}
          >
            BFS
          </Button>
          <InfoLink
            href="https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              title="Learn More"
              style={{ cursor: "pointer" }}
              icon={faCircleInfo}
            />
          </InfoLink>
        </ButtonInfoContainer>
        <ButtonInfoContainer>
          <Button
            style={
              algorithm === "A*"
                ? { border: "1px solid blue" }
                : { border: "none" }
            }
            onClick={handleOptionChange}
            value={"A*"}
            disabled={isRunning}
          >
            A*
          </Button>
          <InfoLink
            href="https://www.geeksforgeeks.org/a-search-algorithm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              title="Learn More"
              style={{ cursor: "pointer" }}
              icon={faCircleInfo}
            />
          </InfoLink>
        </ButtonInfoContainer>
        <p>Others (in development)</p>
        <Button disabled>Genetic Algorithm</Button>

        <Button disabled>Q-Learning based AI</Button>
      </ButtonContainer>
    </div>
  );
};
export default AlgSelector;
