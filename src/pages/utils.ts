export const makeGrid = (rows: number, cols: number) => {
  rows = Math.floor(rows);
  cols = Math.floor(cols);
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }
  return grid;
};

export const initializeGrid = (rows: number, cols: number, symbol = 0) => {
  rows = Math.floor(rows);
  cols = Math.floor(cols);
  let grid = makeGrid(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = symbol;
    }
  }
  return grid;
};

export const updateGrid = (
  position: number[],
  grid: number[][],
  symbol: number = 1
) => {
  let newGrid = grid.map((row) => row.slice());
  newGrid[position[0]][position[1]] = symbol;
  return newGrid;
};
