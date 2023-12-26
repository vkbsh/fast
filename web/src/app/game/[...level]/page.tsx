import GameBoard from "components/screens/Game";

import { Levels } from "components/screens/Game";
import { createGrid, randomInRange } from "lib/game";

const levels: { [key in Levels]: number } = {
  easy: 3,
  hard: 4,
  nightmare: 5,
};

const rotations = [90, 180, 270];

type Props = {
  params: { level: string };
};

export default function Play({ params }: Props) {
  const level = params.level as Levels;
  const gridLength = levels[level];

  const grid = createGrid(gridLength);

  const gridWithRotate = grid.map((row) =>
    row.map((col) => ({
      ...col,
      rotate: rotations[randomInRange(0, rotations.length - 1)],
    }))
  );

  return (
    <div className={containerClassName}>
      <GameBoard grid={gridWithRotate} level={level} />
    </div>
  );
}

const containerClassName = "w-full h-full flex flex-col items-center gap-10";

export const revalidate = 0;
