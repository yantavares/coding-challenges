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

export const initializeRandomGrid = (rows: number, cols: number) => {
  rows = Math.floor(rows);
  cols = Math.floor(cols);
  let grid = makeGrid(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
  }
  return grid;
};

export const checkNeighbors = (
  grid: number[][],
  row: number,
  col: number,
  amount = 1
) => {
  let neighbors = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const x = row + i;
      const y = col + j;
      if (x > -1 && x < rows && y > -1 && y < cols) {
        neighbors += grid[x][y];
      }
    }
  }
  neighbors -= grid[row][col];
  return neighbors;
};

export const checkNeighborsWrapAround = (
  grid: number[][],
  row: number,
  col: number,
  amount = 1
) => {
  let neighbors = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Wrap around for rows and columns
      const x = (row + i + rows) % rows;
      const y = (col + j + cols) % cols;

      neighbors += grid[x][y];
    }
  }

  neighbors -= grid[row][col];
  return neighbors;
};
