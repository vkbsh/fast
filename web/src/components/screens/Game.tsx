"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import useTimer from "hooks/useTimes";
import { transition } from "lib/animation";
import { Col, isOriginalRotation } from "lib/game";
import { formatSecondsToMinutes } from "utils/dateTime";

import { PAGES } from "config";

import SVGLine from "components/SVGLine";

const gridClassByLevel: { [key in Levels]: string } = {
  easy: "grid-cols-3 grid-row-3",
  hard: "grid-cols-4 grid-row-4",
  nightmare: "grid-cols-5 grid-row-5",
};

type RotateCol = Col & { rotate: number };
export type Levels = "easy" | "hard" | "nightmare";

type Props = {
  level: Levels;
  grid: RotateCol[][];
};

export default function Game({ grid, level = "easy" }: Props) {
  const { seconds, stopTimer } = useTimer();
  const [isSolved, setIsSolved] = useState(false);
  const [rotations, setRotations] = useState(grid);

  const handleRotation = (rowIndex: number, colIndex: number) => () => {
    if (isSolved) return;

    const newRotations = [...rotations];

    newRotations[rowIndex][colIndex].rotate =
      newRotations[rowIndex][colIndex].rotate + 90;

    setRotations(newRotations);
  };

  useEffect(() => {
    const solved = rotations.every((row) => {
      return row
        .filter((col) => col.solved)
        .every((col) => isOriginalRotation(col.lineType, col.rotate));
    });

    if (solved) {
      stopTimer();
      setIsSolved(true);
    }
  }, [rotations]);

  const gridClass = gridClassByLevel[level];
  const userScoreFormUrl = `${PAGES.SCORE}/${seconds}`;

  return (
    <>
      <motion.span
        data-test-id="timer"
        className={timeClassName}
        transition={transition.spring}
        animate={{ scale: isSolved ? 2 : 1 }}
      >
        {formatSecondsToMinutes(seconds)}
      </motion.span>
      <div className={`${containerClassName} ${gridClass}`}>
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
                <Col
                  delay={delay}
                  solved={solved}
                  rotate={rotate}
                  connectedSides={connectedSides}
                />
              </button>
            );
          })
        )}
      </div>
      <motion.div
        initial={false}
        transition={transition.spring}
        animate={{ scale: isSolved ? 1 : 0 }}
      >
        <Link href={userScoreFormUrl} className="btn">
          Add User
        </Link>
      </motion.div>
    </>
  );
}

type ColProps = Omit<RotateCol, "lineType"> & {
  delay: number;
};

function Col(props: ColProps) {
  const { rotate, delay, connectedSides, solved } = props;
  const colors = ["#BADC2E", "#FEF9C3"];

  return (
    <motion.div
      animate={{ rotate }}
      className={rotateStyle}
      data-test-id="grid-col"
      data-test-rotate={rotate}
      transition={transition.spring}
    >
      <motion.div
        className={colDefaultStyle}
        animate={{
          backgroundColor: solved ? colors[0] : colors[1],
        }}
        transition={{ ...transition.spring, delay }}
      >
        <SVGLine sides={connectedSides} />
      </motion.div>
    </motion.div>
  );
}

const containerClassName = "md:w-2/3 px-6 w-full grid gap-2 relative";
const timeClassName = "text-center text-2xl font-extrabold";
const colDefaultStyle = "w-full h-full bg-yellow-100";
const rotateStyle =
  "relative z-10 flex shadow-lg justify-center items-center aspect-square border-3 border-gray-800 rounded";

{
  /* <div className="z-0 absolute w-full h-full row-start-1 col-start-1 col-span-1 row-span-1">
          <div className="absolute bottom-1/2 translate-y-1/2 -translate-x-full left-0 flex justify-center items-center w-6 h-6 ">
            <span className="text-3xl">🔌</span>
          </div>
        </div>
        <div className="z-0 absolute w-full h-full row-start-1 col-start-1 col-span-1 row-span-1">
          <div className="absolute bottom-1/2 translate-y-1/2 -translate-x-full left-0 flex justify-center items-center w-6 h-6 ">
            <span className="text-3xl">🔌</span>
          </div>
        </div>
       */
}
