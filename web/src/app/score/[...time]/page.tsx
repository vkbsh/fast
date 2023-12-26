import { redirect } from "next/navigation";

import ScoreForm from "components/screens/ScoreForm";

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

  return (
    <div className={containerClassName}>
      <span className={spaneClassName}>{seconds}s</span>
      <ScoreForm seconds={seconds} userScore={userScore} />
    </div>
  );
}

const containerClassName = "flex flex-col items-center gap-6";
const spaneClassName = "text-5xl font-bold";
