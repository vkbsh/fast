"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { fetcher } from "utils/fetcher";
import { setUserScoreToCookies } from "utils/cookies";

import { PAGES, scoreAPIUrl } from "config";

export type UserScore = {
  name: string;
  email: string;
  seconds: number;
};

export async function postScore(data: UserScore): Promise<void> {
  await fetcher(scoreAPIUrl, data);

  setUserScoreToCookies(data);

  revalidatePath(PAGES.LEADERBOARD);
  redirect(PAGES.LEADERBOARD);
}

export async function getScores() {
  return fetcher<{
    scores: UserScore[];
  }>(scoreAPIUrl);
}
