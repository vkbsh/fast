"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { PAGES } from "config";

import acIcon from "public/icons/ac.svg";
import ccsIcon from "public/icons/ccs.svg";
import chademoIcon from "public/icons/chademo.svg";
import lightningImage from "public/images/lightning.png";

import { transition } from "lib/animation";
import { Levels } from "components/screens/Game";

export type EV = "ccs" | "chademo" | "ac";

const listEVs: { type: EV; src: string; label: string }[] = [
  { type: "ccs", src: ccsIcon, label: "CCS" },
  { type: "chademo", src: chademoIcon, label: "CHAdeMO" },
  { type: "ac", src: acIcon, label: "AC" },
];

const levelsByEVs: { [key in EV]: Levels } = {
  ccs: "easy",
  chademo: "hard",
  ac: "nightmare",
};

export default function EVSelect() {
  const [selectedEVType, setSelectedEVType] = useState<EV | null>(null);

  const handleEVSelect = (type: EV) => () => setSelectedEVType(type);

  const disabledClass = !selectedEVType ? "disabled" : "";
  const level = levelsByEVs[selectedEVType as EV];
  const gameUrl = `${PAGES.GAME}/${level}`;

  return (
    <div className={containerClassName}>
      <section className={sectionClassName}>
        <div className={headerClassName}>
          <span className={imageClassName}>
            <Image src={lightningImage} alt="Lightning" fill />
          </span>
          <TextBlock show={!!selectedEVType} />
        </div>
        <div className={gridClassName}>
          {listEVs.map((ev) => {
            const { type, label, src } = ev;

            return (
              <button
                key={type}
                type="button"
                data-test-id="ev"
                className={evClassName}
                onClick={handleEVSelect(type)}
              >
                <Ev
                  src={src}
                  type={type}
                  label={label}
                  selected={selectedEVType}
                />
              </button>
            );
          })}
        </div>
      </section>
      <Link href={gameUrl} className={`btn ${disabledClass}`}>
        Start your session
      </Link>
    </div>
  );
}

type EvProps = {
  type: EV;
  src: string;
  label: string;
  selected: EV | null;
};

function Ev(props: EvProps) {
  const { type, src, label, selected } = props;

  const active = selected === type;

  const animate = {
    height: active ? "130%" : "100%",
    borderColor: active ? "#1F2937" : "#fff",
    backgroundColor: active ? "#FDDC2E" : "#fff",
    opacity: !selected || active ? 1 : 0.8,
  };

  return (
    <motion.div initial={false} animate={animate} className={evMainClassName}>
      <span className={evLabelClassName}>{label}</span>
      <span className={imageEvClassName}>
        <Image src={src} alt={type} fill />
      </span>

      {active ? (
        <motion.span
          animate={{
            scale: [0, 1, 1.1, 1],
          }}
          transition={transition.spring}
          className={selectedLabelClassName}
        >
          Selected
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function TextBlock({ show }: { show: boolean }) {
  const textBlockClassName =
    "w-full text-gray-800 leading-7 text-2xl text-center";

  return (
    <motion.p
      layout
      animate={{
        scale: [0, 1.1, 1],
      }}
      className={textBlockClassName}
    >
      {!show ? (
        <span className=" line-clamp-2">
          Select your <span className="font-bold">connector type...</span>
        </span>
      ) : (
        <span className=" line-clamp-2">
          Press <span className="font-bold">Start your session</span> to
          proceed...
        </span>
      )}
    </motion.p>
  );
}

const sectionClassName =
  "w-full h-72 flex flex-col pt-4 pb-8 px-3 items-center justify-between bg-yellow-100 rounded-lg border-3 border-gray-700";

const containerClassName = "flex flex-col items-center gap-10";

const imageClassName = "relative w-14 h-14";
const imageEvClassName = "shrink-0 relative block w-[44px] h-[38px]";
const headerClassName = "flex flex-col items-center gap-3";
const evClassName =
  "relative w-full h-20 m-auto flex flex-col justify-between items-center gap-2 bg-wite";

const evMainClassName =
  "absolute w-full h-full top-0 bottom-0 m-auto p-1.5 rounded-lg border-2 flex flex-col justify-start items-center gap-2";
const evLabelClassName = "text-gray-700 text-xs font-bold";
const selectedLabelClassName = "bg-gray-800 rounded text-white px-1 text-xs";
const gridClassName = "w-full grid grid-cols-3 gap-2";
