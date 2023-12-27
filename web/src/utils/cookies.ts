import { cookies } from "next/headers";

import { UserScore } from "actions";

const USER_KEY = "user";

function setCookies(name: string, data: any) {
  cookies().set(name, JSON.stringify(data));
}

function getCookies<T>(name: string): T | undefined {
  const userScore = cookies().get(name)?.value;

  if (!userScore) return undefined;

  return JSON.parse(userScore);
}

export function getUserScoreFromCookies(): UserScore | undefined {
  return getCookies<UserScore>(USER_KEY);
}

export function setUserScoreToCookies(data: UserScore): void {
  setCookies(USER_KEY, data);
}
