import Leaderboard from "components/pages/Leaderboard";

import { getScores } from "actions";

export default async function LeaderBoard() {
  try {
    const data = await getScores();
    const scores = data.scores || [];
    return <Leaderboard data={scores} />;
  } catch (e) {
    return <Leaderboard data={[]} />;
  }
}
