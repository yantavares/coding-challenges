import { Board, HOME, GOAL, Position } from "../types/mazeTypes";
import Solver from "./Solver";

type BFSState = {
  row: number;
  col: number;
  predecessor?: Position; // Optional field to track the path
};

class BFSSolver extends Solver {
  private bfsQueue: BFSState[];
  private predecessors: Map<string, Position>;

  constructor(board: Board) {
    super(board);
    this.bfsQueue = [];
    this.predecessors = new Map();
    this.initializeBFS();
  }

  private initializeBFS(): void {
    // Find the HOME position and initialize BFS queue
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === HOME) {
          this.bfsQueue.push({ row, col });
          this.visited[row][col] = true;
          return;
        }
      }
    }
  }

  public visitNext(): Position | null {
    if (this.bfsQueue.length === 0) {
      return null;
    }

    const currentState = this.bfsQueue.shift();
    if (!currentState) {
      return null;
    }

    const { row, col } = currentState;
    this.row = row;
    this.col = col;

    if (this.board[row][col] === GOAL) {
      this.constructFinalPath(currentState);
      return { row, col };
    }

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    directions.forEach(([dr, dc]) => {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        this.isInBounds(nextRow, nextCol) &&
        !this.visited[nextRow][nextCol]
      ) {
        this.bfsQueue.push({ row: nextRow, col: nextCol });
        this.visited[nextRow][nextCol] = true;
        this.predecessors.set(`${nextRow},${nextCol}`, { row, col });
      }
    });

    return this.bfsQueue.length > 0 ? this.bfsQueue[0] : null;
  }

  private constructFinalPath(currentState: BFSState): void {
    let path: string[] = [];
    let current: Position | undefined = currentState;

    while (current) {
      path.unshift(`(${current.row}, ${current.col})`);
      current = this.predecessors.get(`${current.row},${current.col}`);
    }

    this.finalPath = path;
    this.solved = true;
  }
}

export default BFSSolver;
