"use client";

import { ValidationRule } from "react-hook-form";

import { Form } from "components/Form";

import {
  required,
  minLength,
  emailPattern,
  lettersOnlyPattern,
} from "lib/validation";

import { postScore, UserScore } from "actions";

type Props = {
  seconds: number;
  userScore?: UserScore;
};

export default function ScoreForm({ seconds, userScore }: Props) {
  const onSubmit = async (data: UserScore) => {
    await postScore({ ...data, seconds: Number(seconds) });
  };

  const defaultValues = {
    name: userScore?.name || "",
    email: userScore?.email || "",
  };

  return (
    <div className="w-2/3">
      <Form fields={fields} onSubmit={onSubmit} defaultValues={defaultValues} />
    </div>
  );
}

const fields: {
  name: string;
  label?: string;
  placeholder: string;
  validation: Record<string, ValidationRule>;
}[] = [
  {
    name: "name",
    placeholder: "Name",
    validation: {
      required,
      minLength,
      pattern: lettersOnlyPattern,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    validation: {
      required,
      pattern: emailPattern,
    },
  },
];
