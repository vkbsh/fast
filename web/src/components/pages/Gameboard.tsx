"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import useTimer from "hooks/useTimes";
import { transition } from "lib/animation";
import { Col, isOriginalRotation } from "lib/game";
import { formatSecondsToMinutes } from "utils/dateTime";

import { PAGES } from "config";

import Button from "components/Button";
import SVGLine from "components/SVGLine";

const gridClassByLevel: { [key in Levels]: string } = {
  easy: "w-full grid gap-2 grid-cols-3 grid-row-3",
  hard: "w-full grid gap-2 grid-cols-4 grid-row-4",
  nightmare: "w-full grid gap-2 grid-cols-5 grid-row-5",
};

const carPositionByLevel: { [key in Levels]: string } = {
  easy: "col-start-3",
  hard: "col-start-4",
  nightmare: "col-start-5",
};

type RotateCol = Col & { rotate: number };
export type Levels = "easy" | "hard" | "nightmare";

type Props = {
  level: Levels;
  grid: RotateCol[][];
};

export default function GameBoard({ grid, level = "easy" }: Props) {
  const { seconds, stopTimer } = useTimer();
  const [rotations, setRotations] = useState(grid);

  const isSolved = rotations.every((row) => {
    return row
      .filter((col) => col.solved)
      .every((col) => isOriginalRotation(col.lineType, col.rotate));
  });

  const handleRotation = (rowIndex: number, colIndex: number) => () => {
    if (isSolved) return;

    const newRotations = [...rotations];

    newRotations[rowIndex][colIndex].rotate =
      newRotations[rowIndex][colIndex].rotate + 90;

    setRotations(newRotations);
  };

  useEffect(() => {
    if (isSolved) {
      stopTimer();
    }
  }, [isSolved, stopTimer]);

  const colors = ["#BADC2E", "#FEF9C3"];
  const gridClass = gridClassByLevel[level];
  const carPosition = carPositionByLevel[level];
  const userScoreFormUrl = `${PAGES.SCORE}/${seconds}`;

  return (
    <>
      <div className="game-board">
        <motion.span
          data-test-id="timer"
          transition={transition.spring}
          animate={{ scale: isSolved ? 2 : 1 }}
          className="text-center text-2xl font-extrabold"
        >
          {formatSecondsToMinutes(seconds)}
        </motion.span>
        <div className={`${gridClass} grid-row-1`}>
          <div className="pb-3 col-start-1 text-center text-5xl">💡</div>
        </div>
        <div className={`${gridClass}`}>
          {rotations.map((row, rowIndex) =>
            row.map((col, colIndex) => {
              const { rotate, lineType, connectedSides } = col;

              const key = `${rowIndex}-${colIndex}`;
              const delay = 0.1 * (rowIndex + colIndex);
              const correctRotation = isOriginalRotation(lineType, rotate);
              const solved = col.solved && isSolved && correctRotation;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={handleRotation(rowIndex, colIndex)}
                >
                  <motion.div
                    animate={{ rotate }}
                    data-test-id="grid-col"
                    data-test-rotate={rotate}
                    className="game-board-col"
                    transition={transition.spring}
                  >
                    <motion.div
                      className="w-full h-full bg-yellow-100"
                      animate={{
                        backgroundColor: solved ? colors[0] : colors[1],
                      }}
                      transition={{ ...transition.spring, delay }}
                    >
                      <SVGLine sides={connectedSides} />
                    </motion.div>
                  </motion.div>
                </button>
              );
            })
          )}
        </div>
        <div className={`${gridClass} grid-row-1`}>
          <div className={`${carPosition} pb-3 text-center text-5xl`}>🚗</div>
        </div>
      </div>

      <Button href={userScoreFormUrl} hidden={!isSolved}>
        Add User
      </Button>
    </>
  );
}
