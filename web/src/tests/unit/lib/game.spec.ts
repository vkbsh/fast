import {
  addSides,
  createGrid,
  createMatrix,
  determineSide,
  findSolvedPath,
  isOriginalRotation,
  getNormalizedRotation,
} from "lib/game";

describe("createMatrix", () => {
  it("should create a matrix of the specified length", () => {
    const length = 3;
    const matrix = createMatrix(length);

    expect(matrix).toHaveLength(length);

    matrix.forEach((row) => {
      expect(row).toHaveLength(length);
    });
  });
});

describe("createGrid", () => {
  it("should create a grid with a valid path, connected sides, and rotation", () => {
    const gridSize = 3;
    const grid = createGrid(gridSize);

    expect(grid).toHaveLength(gridSize);

    let pathLength = 0;
    const possiblePathLength = gridSize * 2 - 1;

    grid.forEach((row) => {
      expect(row).toHaveLength(gridSize);

      row.forEach((col) => {
        pathLength += col.solved ? 1 : 0;
      });
    });

    expect(pathLength).toBeGreaterThanOrEqual(possiblePathLength);
  });
});

describe("findSolvedPath", () => {
  it("should find a valid path in the grid", () => {
    const gridSize = 3;
    const path = findSolvedPath(gridSize);
    const possiblePathLength = gridSize * 2 - 1;

    expect(path?.length).toBeGreaterThanOrEqual(possiblePathLength);
  });
});

describe("determineSide", () => {
  it("should determine the side based on the current and next path", () => {
    const current1 = [0, 0];
    const next1 = [0, 1];
    expect(determineSide(current1, next1)).toBe("right");

    const current2 = [0, 1];
    const next2 = [1, 1];
    expect(determineSide(current2, next2)).toBe("bottom");
  });
});

describe("addSides", () => {
  it("should add connected sides and rotation to each col in the grid", () => {
    const solved = {
      path: [
        [0, 0],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
      grid: [
        [
          {
            solved: true,
            lineType: "linear",
            connectedSides: ["top", "bottom"],
          },
          {
            solved: false,
          },
          {
            solved: false,
          },
        ],
        [
          {
            solved: true,
            lineType: "orthogonal",
            connectedSides: ["top", "right"],
          },
          {
            solved: true,
            lineType: "linear",
            connectedSides: ["left", "right"],
          },
          {
            solved: true,
            lineType: "orthogonal",
            connectedSides: ["left", "bottom"],
          },
        ],
        [
          {
            solved: false,
          },
          {
            solved: false,
          },
          {
            solved: true,
            lineType: "linear",
            connectedSides: ["top", "bottom"],
          },
        ],
      ],
    };

    const gridSize = 3;
    const grid = addSides(gridSize, solved.path);

    grid.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col.solved) {
          expect(col.connectedSides).toEqual(
            solved.grid[rowIndex][colIndex].connectedSides
          );
          expect(col.lineType).toEqual(
            solved.grid[rowIndex][colIndex].lineType
          );
        } else {
          expect(col.connectedSides).toHaveLength(2);
          expect(col.lineType).toBeDefined();
        }
      });
    });
  });
});

describe("isOriginalRotation", () => {
  it("should return allowed rotations based on connected sides", () => {
    // linear
    expect(isOriginalRotation("linear", 0)).toEqual(true);
    expect(isOriginalRotation("linear", 90)).toEqual(false);
    expect(isOriginalRotation("linear", 180)).toEqual(true);
    expect(isOriginalRotation("linear", 270)).toEqual(false);

    // orthogonal
    expect(isOriginalRotation("orthogonal", 0)).toEqual(true);
    expect(isOriginalRotation("orthogonal", 90)).toEqual(false);
    expect(isOriginalRotation("orthogonal", 180)).toEqual(false);
    expect(isOriginalRotation("orthogonal", 270)).toEqual(false);
  });
});

describe("getNormalizedRotation", () => {
  it("should normalize the rotation to a value between 0 and 270", () => {
    expect(getNormalizedRotation(0)).toBe(0);
    expect(getNormalizedRotation(90)).toBe(90);
    expect(getNormalizedRotation(180)).toBe(180);
    expect(getNormalizedRotation(270)).toBe(270);
    expect(getNormalizedRotation(360)).toBe(0);
    expect(getNormalizedRotation(450)).toBe(90);
    expect(getNormalizedRotation(540)).toBe(180);
    expect(getNormalizedRotation(630)).toBe(270);
    expect(getNormalizedRotation(720)).toBe(0);
  });
});
