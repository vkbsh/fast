import { redirect } from "next/navigation";

import ScoreForm from "components/pages/ScoreForm";

import { getUserScoreFromCookies } from "utils/cookies";

type Props = {
  params: { time: string };
};

export default function Score({ params }: Props) {
  if (!params.time) {
    redirect("/");
  }

  const seconds = Number(params.time);
  const userScore = getUserScoreFromCookies();

  return <ScoreForm seconds={seconds} userScore={userScore} />;
}
