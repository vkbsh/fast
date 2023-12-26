"use client";

import { useState, ChangeEvent } from "react";

import { Table } from "components/Table";

import { UserScore } from "actions";

type Props = {
  data: UserScore[];
};

export default function Leaderboard({ data }: Props) {
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

  return (
    <div className={containerClassName}>
      <input
        type="text"
        className=" input"
        placeholder="Type Name"
        onChange={handleChange}
      />
      <Table labels={labels} data={scores} />
    </div>
  );
}

const containerClassName =
  "w-full xs:w-2/3  md:w-96 flex items-center flex-col gap-2";
