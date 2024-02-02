import {
  faFlag,
  faHome,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Position, VISITED } from "../../types/mazeTypes";
import {
  BackButton,
  BlockedSquare,
  BoardContainer,
  ButtonContainer,
  EmptySquare,
  EndText,
  GoalSquare,
  HomeSquare,
  MazeButton,
  VisitedSquare,
} from "./styles";
import {
  clearBoard,
  isLastVisited,
  resetVisited,
  spaceClickAction,
  spaceHoverAction,
} from "./utils";
import { graphSolver } from "./utils/graphSolver";
import { useNavigate } from "react-router-dom";

const EMPTY = "";
const BLOCKED = "=";
const GOAL = "g";
const HOME = "h";

const Maze = ({
  board,
  setBoard,
  isRunning,
  setIsRunning,
  algorithm,
  size = 20,
  showButtons = true,
  delay = 40,
}) => {
  const navigate = useNavigate();

  const [isKeyDown, setIsKeyDown] = useState(false);
  const [clearBoardToggle, setClearBoardToggle] = useState(false);
  const [lastVisited, setLastVisited] = useState<Position | null>(null);
  const [foundSolution, setFoundSolution] = useState(false);

  const [endMessage, setEndMessage] = useState("");

  useEffect(() => {
    clearBoard(setBoard, setLastVisited, setEndMessage, size);
  }, [clearBoardToggle, size]);

  useEffect(() => {
    const handleKeyDown = () => {
      setIsKeyDown(true);
    };

    const handleKeyUp = () => {
      setIsKeyDown(false);
    };

    const handleMouseDown = () => {
      resetVisited(setBoard);
      setIsKeyDown(true);
    };

    const handleMouseUp = () => {
      resetVisited(setBoard);
      setIsKeyDown(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsRunning(true);
    setEndMessage("");

    graphSolver(
      algorithm,
      board,
      setBoard,
      foundSolution,
      setFoundSolution,
      setLastVisited,
      delay
    ).then((msg) => {
      setFoundSolution(false);
      setIsRunning(false);
      setEndMessage(msg);
    });
  };

  const handleSpaceHover = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index1: number,
    index2: number
  ) => {
    e.preventDefault();
    spaceHoverAction(board, setBoard, isKeyDown, index1, index2);
  };

  const handleSpaceClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index1: number,
    index2: number
  ) => {
    e.preventDefault();
    spaceClickAction(board, setBoard, index1, index2);
  };

  const handleClearBoard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsRunning(false);
    setFoundSolution(false);
    setEndMessage("");
    setClearBoardToggle(!clearBoardToggle);
  };

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <BoardContainer>
      <div>
        {board.map((line: string[], lineIndex: number) => (
          <div key={lineIndex} style={{ display: "flex" }}>
            {line.map((space: string, spaceIndex: number) => {
              if (space === EMPTY) {
                return (
                  <EmptySquare
                    key={spaceIndex}
                    onMouseMove={(e) =>
                      handleSpaceHover(e, lineIndex, spaceIndex)
                    }
                    onClick={(e) => handleSpaceClick(e, lineIndex, spaceIndex)}
                  />
                );
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
      {showButtons && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
        >
          <ButtonContainer>
            <BackButton
              title="Go back"
              onClick={(e) => handleGoBack(e)}
              disabled={isRunning}
            >
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </BackButton>
            <MazeButton
              onClick={(e) => handleClearBoard(e)}
              disabled={isRunning}
            >
              Clear
            </MazeButton>
            <MazeButton onClick={(e) => handleClick(e)} disabled={isRunning}>
              {isRunning ? "Running" : "Run"}
            </MazeButton>
          </ButtonContainer>
          <EndText>
            {endMessage
              ? endMessage
              : isRunning
              ? "Solving using " + algorithm + " algorithm..."
              : "Press 'Run' to start"}
          </EndText>
        </div>
      )}
    </BoardContainer>
  );
};
export default Maze;
