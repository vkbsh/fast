package nl.fastned.leaderboard.resource.model

import nl.fastned.leaderboard.service.model.LeaderboardModel

data class Leaderboard(
    val scores: List<Score>
) {
    companion object {
        fun from(leaderboard: LeaderboardModel): Leaderboard {
            return Leaderboard(
                leaderboard.scores.map {
                    Score.from(it)
                }
            )
        }
    }
}
