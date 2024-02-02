import { Board, Position, BLOCKED } from "../types/mazeTypes";

export abstract class Solver {
  protected board: Board;
  protected visited: boolean[][];
  protected path: string[];
  protected finalPath: string[];
  protected solved: boolean;
  protected row: number | null;
  protected col: number | null;

  constructor(board: Board) {
    this.board = board;
    this.visited = board.map((row) => row.map(() => false));
    this.path = [];
    this.finalPath = [];
    this.solved = false;
    this.row = null;
    this.col = null;
  }

  protected isInBounds(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[row].length &&
      this.board[row][col] !== BLOCKED
    );
  }

  public abstract visitNext(): Position | null;

  public getFinalPath(): string[] {
    return this.finalPath;
  }

  public getPath(): string[] {
    return this.path;
  }

  public isSolved(): boolean {
    return this.solved;
  }

  public getLastPosition(): Position {
    return { row: this.row ?? -1, col: this.col ?? -1 };
  }
}

export default Solver;
