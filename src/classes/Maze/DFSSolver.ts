import { Board, HOME, GOAL, Position } from "../../types/mazeTypes";
import Solver from "./Solver";

type DFSState = {
  row: number;
  col: number;
  directionIndex: number;
};

class DFSSolver extends Solver {
  private dfsStack: DFSState[];

  constructor(board: Board) {
    super(board);
    this.dfsStack = [];
    this.initializeDFS();
  }

  private initializeDFS(): void {
    // Find the HOME position and initialize DFS stack
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === HOME) {
          this.dfsStack.push({ row, col, directionIndex: 0 });
          return;
        }
      }
    }
  }

  public visitNext(): Position | null {
    if (this.dfsStack.length === 0) {
      return null; // DFS complete
    }

    const currentState = this.dfsStack[this.dfsStack.length - 1];
    const { row, col, directionIndex } = currentState;
    this.row = row;
    this.col = col;

    if (directionIndex === 0) {
      // First visit to this cell
      this.path.push(`(${row}, ${col})`);
      this.visited[row][col] = true;
      if (this.board[row][col] === GOAL) {
        this.finalPath = [...this.path];
        this.solved = true;
        return { row, col };
      }
    }

    // Directions: Down, Right, Up, Left
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    while (currentState.directionIndex < directions.length) {
      const [dr, dc] = directions[currentState.directionIndex];
      currentState.directionIndex++;
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        this.isInBounds(nextRow, nextCol) &&
        !this.visited[nextRow][nextCol]
      ) {
        this.dfsStack.push({ row: nextRow, col: nextCol, directionIndex: 0 });
        return { row: nextRow, col: nextCol };
      }
    }

    // Backtrack
    this.dfsStack.pop();
    this.path.pop();
    return { row, col }; // Return current position as we backtrack
  }
}

export default DFSSolver;
