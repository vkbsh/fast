"use client";

import { useState, Fragment } from "react";
import { useForm, ValidationRule } from "react-hook-form";

import {
  required,
  minLength,
  emailPattern,
  lettersOnlyPattern,
} from "lib/validation";

import Button from "components/Button";

import { postScore, UserScore } from "actions";

type Props = {
  seconds: number;
  userScore?: UserScore;
};

export default function ScoreForm({ seconds, userScore }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [serverErrMsg, setServerErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userScore?.name || "",
      email: userScore?.email || "",
    },
  });

  const onSubmit = async (data: Omit<UserScore, "seconds">) => {
    setLoading(true);
    try {
      await postScore({ ...data, seconds: Number(seconds) });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setServerErrMsg("Something went wrong. Please try again later.");
    }
  };

  const disabled = Object.keys(errors).length > 0 || isLoading;

  return (
    <>
      <span className="text-5xl font-bold">{seconds}s</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full flex flex-col gap-5 items-center"
      >
        {fields.map(({ name, validation, placeholder }) => {
          const errorMessage = errors?.[name]?.message || "";

          return (
            <Fragment key={name}>
              <label key={name} className="relative w-full">
                <input
                  type="text"
                  className="input"
                  placeholder={placeholder}
                  {...register(name, validation)}
                />
                {errorMessage ? (
                  <span className="absolute -bottom-4 px-6 text-xs text-red-700">
                    {errorMessage}
                  </span>
                ) : null}
              </label>
            </Fragment>
          );
        })}

        <Button type="submit" disabled={disabled}>
          Submit
        </Button>

        {serverErrMsg ? (
          <span className="absolute -bottom-10 text-xs text-red-700">
            {serverErrMsg}
          </span>
        ) : null}
      </form>
    </>
  );
}

const fields: {
  placeholder: string;
  name: "name" | "email";
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
