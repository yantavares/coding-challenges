import {
  BLOCKED,
  EMPTY,
  Board,
  Position,
  VISITED,
  GOAL,
  HOME,
} from "../../../types/mazeTypes";

export const isHome = (row: number, col: number) => {
  return row === 0 && col === 0;
};

export const isGoal = (row: number, col: number, size: number) => {
  return row === size - 1 && col === size - 1;
};

export const updateBoard = (
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  row: number,
  col: number,
  value: string
) => {
  setBoard((prevBoard) => {
    const updatedBoard = prevBoard.map((rowArray, rowIndex) => {
      if (rowIndex === row) {
        const newRow = [...rowArray];
        newRow[col] = value;
        return newRow;
      }
      return rowArray;
    });
    return updatedBoard;
  });
};

export const updatePath = (
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  row: number,
  col: number,
  value: string
) => {
  const updatedPath = board.map((row: string[]) => [...row]);
  updatedPath[row][col] = value;
  setBoard(updatedPath);
};

export const clearBoard = (
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  setLastVisited: React.Dispatch<React.SetStateAction<Position | null>>,
  setEndMessage: React.Dispatch<React.SetStateAction<string>>,
  size: number
) => {
  setLastVisited(null);
  const clearedBoard: string[][] = [];

  for (let i = 0; i < size; i++) {
    const newArr: string[] = [];
    for (let j = 0; j < size; j++) {
      if (i === 0 && j === 0) {
        newArr.push(HOME);
      } else if (i === size - 1 && j === size - 1) {
        newArr.push(GOAL);
      } else {
        newArr.push(EMPTY);
      }
    }
    clearedBoard.push(newArr);
  }
  setBoard(clearedBoard);
  setEndMessage("");
};

export const resetVisited = (
  setBoard: React.Dispatch<React.SetStateAction<Board>>
) => {
  setBoard((prevBoard) => {
    return prevBoard.map((row) =>
      row.map((cell) => (cell === VISITED ? EMPTY : cell))
    );
  });
};

export const isLastVisited = (
  lastVisited: Position | null,
  rowIndex: number,
  colIndex: number
) => {
  return (
    lastVisited &&
    lastVisited?.row === rowIndex &&
    lastVisited?.col === colIndex
  );
};

export const spaceHoverAction = (
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  isKeyDown: boolean,
  index1: number,
  index2: number
) => {
  if (isKeyDown) {
    const newBoard = board.map((row: string[]) => [...row]);
    newBoard[index1][index2] = BLOCKED;
    setBoard(newBoard);
  }
};

export const spaceClickAction = (
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  index1: number,
  index2: number
) => {
  const drawnBoard = board.map((row: string[]) => [...row]);
  drawnBoard[index1][index2] = BLOCKED;
  setBoard(drawnBoard);
};
