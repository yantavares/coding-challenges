export type Cell = string;
export type Board = Cell[][];

export interface Position {
  row: number;
  col: number;
}

export const EMPTY = "";
export const BLOCKED = "=";
export const GOAL = "g";
export const HOME = "h";
export const VISITED = "v";
