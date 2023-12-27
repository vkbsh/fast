"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import acIcon from "public/icons/ac.svg";
import ccsIcon from "public/icons/ccs.svg";
import chademoIcon from "public/icons/chademo.svg";
import lightningImage from "public/images/lightning.png";

import Button from "components/Button";
import { Levels } from "components/pages/Gameboard";

import { PAGES } from "config";
import { transition } from "lib/animation";

export type EV = "ccs" | "chademo" | "ac";

export const listEVs: { type: EV; src: string; label: string }[] = [
  { type: "ccs", src: ccsIcon, label: "CCS" },
  { type: "chademo", src: chademoIcon, label: "CHAdeMO" },
  { type: "ac", src: acIcon, label: "AC" },
];

export const levelsByEVs: { [key in EV]: Levels } = {
  ccs: "easy",
  chademo: "hard",
  ac: "nightmare",
};

function TextBlock({ selected }: { selected: boolean }) {
  return (
    <div className="w-full text-gray-800 leading-7 text-2xl text-center">
      {!selected ? (
        <motion.p
          key="1"
          animate={{
            scale: [0, 1],
          }}
          className="line-clamp-2"
        >
          Select your <span className="font-bold">connector type...</span>
        </motion.p>
      ) : (
        <motion.p
          key="2"
          animate={{
            scale: [0, 1],
          }}
          className="line-clamp-2"
        >
          Press <span className="font-bold">Start your session</span> to
          proceed...
        </motion.p>
      )}
    </div>
  );
}

export default function EVSelect() {
  const [selectedEVType, setSelectedEVType] = useState<EV | null>(null);

  const level = levelsByEVs[selectedEVType as EV];
  const gameUrl = `${PAGES.GAME}/${level}`;

  return (
    <>
      <section className="select-container">
        <div className="flex flex-col justify-between items-center">
          <Image src={lightningImage} alt="Lightning" className="w-14 h-14" />
          <TextBlock selected={!!selectedEVType} />
        </div>
        <div className="w-full grid grid-cols-3 gap-2">
          {listEVs.map(({ type, label, src }) => {
            const active = selectedEVType === type;

            const animate = {
              height: active ? "130%" : "100%",
              borderColor: active ? "#1F2937" : "#fff",
              opacity: !selectedEVType || active ? 1 : 0.8,
              backgroundColor: active ? "#FDDC2E" : "#fff",
            };

            return (
              <button
                key={type}
                type="button"
                data-test-id="ev"
                className="relative w-full h-20  bg-white"
                onClick={() => setSelectedEVType(type)}
              >
                <motion.div
                  initial={false}
                  animate={animate}
                  className="select-item"
                >
                  <span className="text-gray-700 text-xs font-bold">
                    {label}
                  </span>
                  <Image src={src} alt={type} className="w-[44px] h-[38px]" />
                  {active ? (
                    <motion.span
                      layout
                      animate={{
                        scale: [0, 1, 1.1, 1],
                      }}
                      className="bg-gray-800 rounded text-white px-1 text-xs"
                      transition={transition.spring}
                    >
                      Selected
                    </motion.span>
                  ) : null}
                </motion.div>
              </button>
            );
          })}
        </div>
      </section>
      <Button href={gameUrl} disabled={!selectedEVType}>
        Start your session
      </Button>
    </>
  );
}
