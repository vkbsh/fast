import Link from "next/link";

import Leaderboard from "components/screens/Leaderboard";

import { PAGES } from "config";

import { getScores } from "actions";

export default async function LeaderBoard() {
  const data = await getScores();
  const scores = data.scores || [];

  return (
    <div className={containerClassName}>
      <Leaderboard data={scores} />
      <Link href={PAGES.HOME} className="btn">
        Play again
      </Link>
    </div>
  );
}

const containerClassName = "flex flex-col justify-between items-center gap-10";
