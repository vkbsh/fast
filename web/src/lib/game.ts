export type Side = "left" | "top" | "right" | "bottom";
export type Line = "linear" | "orthogonal";

type Position = number[];
type Path = Position[];

export type Col = {
  solved: boolean;
  lineType: Line;
  connectedSides: Side[];
};

const oppositeSides: Record<Side, Side> = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

const lineTypes: { [key in Line]: Line } = {
  linear: "linear",
  orthogonal: "orthogonal",
};

export function getLineType(connectedSides: Side[]): Line {
  if (connectedSides.includes("top") && connectedSides.includes("bottom")) {
    return lineTypes.linear;
  }

  if (connectedSides.includes("left") && connectedSides.includes("right")) {
    return lineTypes.linear;
  }

  return lineTypes.orthogonal;
}

export function createMatrix(length: number) {
  return Array.from({ length }, () => Array.from({ length }, () => null));
}

export const getNormalizedRotation = (deg: number): number =>
  ((deg / 90) % 4) * 90;

export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isOriginalRotation(lineType: Line, rotate: number): boolean {
  switch (lineType) {
    case lineTypes.linear:
      return [0, 180].includes(getNormalizedRotation(rotate));
    case lineTypes.orthogonal:
    default:
      return [0].includes(getNormalizedRotation(rotate));
  }
}

export function determineSide(
  [rowIndex, colIndex]: Position,
  [nextRowIndex, nextColIndex]: Position
): Side | undefined {
  if (rowIndex > nextRowIndex) return "top";
  if (rowIndex < nextRowIndex) return "bottom";
  if (colIndex < nextColIndex) return "right";
  if (colIndex > nextColIndex) return "left";
}

export function findSolvedPath(
  gridDimension: number,
  path: Path = [[0, 0]]
): Path {
  const lastIndex = gridDimension - 1;
  const [currentRowIndex, currentColIndex] = path[path.length - 1];

  let nextPositions = [];
  const nextRowIndex = currentRowIndex + 1;
  const nextColIndex = currentColIndex + 1;

  if (currentRowIndex === lastIndex && currentColIndex === lastIndex) {
    return path;
  }

  if (currentColIndex < lastIndex) {
    nextPositions.push([currentRowIndex, nextColIndex]);
  }

  if (currentRowIndex < lastIndex) {
    nextPositions.push([nextRowIndex, currentColIndex]);
  }

  nextPositions.sort(() => Math.random() - 0.5);

  for (let nextPosition of nextPositions) {
    return findSolvedPath(gridDimension, [...(path || []), nextPosition]);
  }

  return path;
}

const sides: Side[] = ["top", "right", "bottom", "left"];

export function addSides(gridDimension: number, path: Path): Col[][] {
  const grid = createMatrix(gridDimension);

  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      const currentPathIndex = path.findIndex(
        (p) => p[0] === rowIndex && p[1] === colIndex
      );
      const currentPathPosition: Position = path[currentPathIndex];

      if (!currentPathPosition) {
        const connectedSides: Side[] = [
          sides[randomInRange(0, 1)],
          sides[randomInRange(2, 3)],
        ];

        return {
          solved: false,
          connectedSides,
          lineType: getLineType(connectedSides),
        };
      } else {
        const lastIndex = path.length - 1;
        const prev = path[currentPathIndex - 1];
        const next = path[currentPathIndex + 1];

        let connectedSides: Side[] = [];

        if (currentPathIndex === 0) {
          connectedSides = [
            "left",
            determineSide(currentPathPosition, next) as Side,
          ];
        }

        if (currentPathIndex > 0) {
          const prevSide = determineSide(prev, currentPathPosition) as Side;

          connectedSides = [
            oppositeSides[prevSide],
            currentPathIndex === lastIndex
              ? "right"
              : (determineSide(currentPathPosition, next) as Side),
          ];
        }

        return {
          solved: true,
          connectedSides: connectedSides,
          lineType: getLineType(connectedSides),
        };
      }
    });
  });
}

export function createGrid(gridDimension = 3) {
  const solvedPath = findSolvedPath(gridDimension);
  const grid = addSides(gridDimension, solvedPath);

  return grid;
}
