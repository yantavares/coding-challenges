import { faFlag, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Position, VISITED } from "../../types/mazeTypes";
import {
  BlockedSquare,
  BoardContainer,
  EmptySquare,
  GoalSquare,
  HomeSquare,
  VisitedSquare,
} from "../Maze/styles";
import { isLastVisited, resetVisited } from "../Maze/utils";
import { graphSolver } from "../Maze/utils/graphSolver";

const EMPTY = "";
const BLOCKED = "=";
const GOAL = "g";
const HOME = "h";

const Maze = ({ board, setBoard, delay = 40 }) => {
  const [lastVisited, setLastVisited] = useState<Position | null>(null);
  const [foundSolution, setFoundSolution] = useState(false);
  const [toggleReload, setToggleReload] = useState(false);

  useEffect(() => {
    graphSolver(
      "DFS",
      board,
      setBoard,
      foundSolution,
      setFoundSolution,
      setLastVisited,
      delay
    ).then(() => {
      setFoundSolution(false);
      resetVisited(setBoard);
    });
  }, [toggleReload]);

  setTimeout(() => {
    setToggleReload(!toggleReload);
  }, 9200);

  return (
    <BoardContainer>
      <div>
        {board.map((line: string[], lineIndex: number) => (
          <div key={lineIndex} style={{ display: "flex" }}>
            {line.map((space: string, spaceIndex: number) => {
              if (space === EMPTY) {
                return <EmptySquare key={spaceIndex} />;
              } else if (space === BLOCKED) {
                return <BlockedSquare key={spaceIndex} />;
              } else if (space === HOME) {
                return (
                  <HomeSquare key={spaceIndex}>
                    {<FontAwesomeIcon icon={faHome} color="black" />}
                  </HomeSquare>
                );
              } else if (isLastVisited(lastVisited, lineIndex, spaceIndex)) {
                return <VisitedSquare key={spaceIndex} />;
              } else if (space === GOAL) {
                return (
                  <GoalSquare key={spaceIndex}>
                    {<FontAwesomeIcon icon={faFlag} color="red" />}
                  </GoalSquare>
                );
              } else if (space === VISITED) {
                return <VisitedSquare key={spaceIndex} />;
              }
            })}
          </div>
        ))}
      </div>
    </BoardContainer>
  );
};
export default Maze;
