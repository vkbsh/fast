"use client";

import { motion } from "framer-motion";
import { useState, ChangeEvent } from "react";

import { PAGES } from "config";

import Button from "components/Button";

import { transition } from "lib/animation";

import { UserScore } from "actions";

type Props = {
  data: UserScore[];
};

export default function Leaderboard({ data = [] }: Props) {
  const [value, setValue] = useState("");

  const scores = data
    .filter((score) => {
      if (!value) return true;

      return score.name.toLowerCase().includes(value.toLowerCase());
    })
    .sort((a, b) => a.seconds - b.seconds)
    .map(({ name, seconds }, i) => [i + 1, name, seconds]);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const labels = ["Rank", "Name", "Time"];
  const noDataFromServer = data.length === 0;

  return (
    <div className="w-full flex items-center flex-col gap-2">
      <input
        type="text"
        className=" input"
        placeholder="Type Name"
        onChange={handleChange}
      />
      <div className="table">
        <div className="text-xs text-gray-700 uppercase bg-gray-50 flex">
          {labels?.map((label, i) => (
            <div key={label} className="px-6 py-2 w-1/3">
              {label}
            </div>
          ))}
        </div>
        {noDataFromServer && (
          <div className="px-6 py-2 bg-white w-full text-center">
            No data from server
          </div>
        )}
        <div className="overflow-y-scroll max-h-96">
          {scores?.map((items) => {
            return (
              <motion.div
                layout
                key={items.join("")}
                className="w-full flex"
                transition={transition.spring}
                animate={{ height: [0, 40], opacity: [0, 1] }}
                exit={{ height: [40, 0], opacity: [1, 0] }}
              >
                {items.map((item, i) => (
                  <div
                    key={`${item}-${i}`}
                    className="px-6 py-2 w-1/3 bg-white"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
      <Button href={PAGES.HOME}>Play again</Button>;
    </div>
  );
}
