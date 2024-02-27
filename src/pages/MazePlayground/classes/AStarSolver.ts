import { Board, HOME, GOAL, Position } from "../../../types/mazeTypes";
import Solver from "./Solver";
import PriorityQueue from "./utils/PriorityQueue";

type AStarState = {
  row: number;
  col: number;
  cost: number;
  predecessor?: Position;
};
class AStarSolver extends Solver {
  private priorityQueue: PriorityQueue<AStarState>;
  private predecessors: Map<string, Position>;

  constructor(board: Board) {
    super(board);
    this.priorityQueue = new PriorityQueue<AStarState>();
    this.predecessors = new Map();
    this.initializeAStar();
  }

  private initializeAStar(): void {
    this.priorityQueue.enqueue({ row: 0, col: 0, cost: 0 }, 0);
    this.visited[0][0] = true;
  }

  private heuristic(row: number, col: number): number {
    const goalRow = this.board.length - 1;
    const goalCol = this.board[0].length - 1;
    return Math.sqrt(Math.pow(goalRow - row, 2) + Math.pow(goalCol - col, 2));
  }

  public visitNext(): Position | null {
    if (this.priorityQueue.isEmpty()) {
      return null;
    }

    const currentState = this.priorityQueue.dequeue();
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
        const nextCost = currentState.cost + 1;
        const priority = nextCost + this.heuristic(nextRow, nextCol);
        this.priorityQueue.enqueue(
          { row: nextRow, col: nextCol, cost: nextCost },
          priority
        );
        this.visited[nextRow][nextCol] = true;
        this.predecessors.set(`${nextRow},${nextCol}`, { row, col });
      }
    });

    // Peek the next state and return its position or null
    const nextState = this.priorityQueue.peek();
    return nextState ? { row: nextState.row, col: nextState.col } : null;
  }

  private constructFinalPath(currentState: AStarState): void {
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

export default AStarSolver;
