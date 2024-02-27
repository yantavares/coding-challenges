import { isGoal, isHome, updateBoard, updatePath } from ".";
import AStarSolver from "../../../pages/MazePlayground/classes/AStarSolver";
import BFSSolver from "../../../pages/MazePlayground/classes/BFSSolver";
import DFSSolver from "../../../pages/MazePlayground/classes/DFSSolver";
import { Board, GOAL, Position, VISITED } from "../../../types/mazeTypes";

type SearchType = "DFS" | "BFS" | "A*";

export const graphSolver = (
  searchType: SearchType,
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<Board>>,
  foundSolution: boolean,
  setFoundSolution: React.Dispatch<React.SetStateAction<boolean>>,
  setLastVisited: React.Dispatch<React.SetStateAction<Position | null>>,
  delay: number
): Promise<string> => {
  return new Promise((resolve) => {
    let solver: DFSSolver | BFSSolver | AStarSolver;
    switch (searchType) {
      case "DFS":
        solver = new DFSSolver(board);
        break;
      case "BFS":
        solver = new BFSSolver(board);
        break;
      case "A*":
        solver = new AStarSolver(board);
        break;
      default:
        throw new Error(`Invalid search type: ${searchType}`);
    }

    let iterationCount = 0;
    const maxIterations = 1000;

    const visitNext = (iteration: number, foundSol: boolean) => {
      if (iteration > maxIterations) {
        resolve("Max iterations reached, stopping");
        return;
      }

      if (foundSol) {
        const finalPath = solver.getFinalPath();

        finalPath.forEach((posStr) => {
          const [row, col] = posStr.replace(/[()]/g, "").split(",").map(Number);
          if (!isHome(row, col) && !isGoal(row, col, board.length))
            updateBoard(setBoard, row, col, VISITED);
        });
        resolve(`Solution found! Total iterations: ${iteration}`);
        return;
      }

      setLastVisited(solver.getLastPosition());

      const next = solver.visitNext();
      iteration++;

      if (next) {
        if (!isGoal(next.row, next.col, board.length))
          updatePath(board, setBoard, next.row, next.col, VISITED);
        else {
          updatePath(board, setBoard, next.row, next.col, GOAL);
        }
        if (solver.isSolved()) {
          setFoundSolution(true);
          setTimeout(() => visitNext(iteration, true), delay);
        } else {
          setTimeout(() => visitNext(iteration, foundSol), delay);
        }
      } else {
        resolve("No solution found");
      }
    };

    visitNext(iterationCount, foundSolution);
  });
};
