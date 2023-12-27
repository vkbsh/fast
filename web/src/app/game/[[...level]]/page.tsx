import { createGrid, randomInRange } from "lib/game";

import GameBoard, { Levels } from "components/pages/Gameboard";

const levels: { [key in Levels]: number } = {
  easy: 3,
  hard: 4,
  nightmare: 5,
};

const rotations = [90, 180, 270];

type Props = {
  params: { level: string };
};

export default function Game({ params }: Props) {
  const level = params.level as Levels;
  const gridLength = levels[level];

  const grid = createGrid(gridLength);

  const gridWithRotate = grid.map((row) =>
    row.map((col) => ({
      ...col,
      rotate: rotations[randomInRange(0, rotations.length - 1)],
    }))
  );

  return <GameBoard grid={gridWithRotate} level={level} />;
}

export async function generateStaticParams() {
  return Object.keys(levels).map((level) => level);
}

export const revalidate = 0;
