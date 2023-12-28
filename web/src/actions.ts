"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { setUserScoreToCookies } from "utils/cookies";

import { PAGES, scoreAPIUrl } from "config";

export type UserScore = {
  name: string;
  email: string;
  seconds: number;
};

export async function getScores(): Promise<{
  scores: UserScore[];
}> {
  const res = await fetch(scoreAPIUrl);
  const json = await res.json();

  return json;
}

export async function postScore(data: UserScore): Promise<void> {
  await fetch(scoreAPIUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  setUserScoreToCookies(data);

  revalidatePath(PAGES.LEADERBOARD);
  redirect(PAGES.LEADERBOARD);
}
