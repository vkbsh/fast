import { cookies } from "next/headers";

import { UserScore } from "actions";

const USER_KEY = "user";

function setCookies(name: string, data: any) {
  cookies().set(name, JSON.stringify(data));
}

function getCookies(name: string) {
  const userScore = cookies().get(name)?.value;

  if (!userScore) return undefined;

  return JSON.parse(userScore);
}

export function getUserScoreFromCookies(): UserScore | undefined {
  const userScore = cookies().get(USER_KEY)?.value;

  if (!userScore) return undefined;

  return getCookies(USER_KEY);
}

export function setUserScoreToCookies(data: UserScore) {
  setCookies(USER_KEY, data);
}
