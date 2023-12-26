package nl.fastned.leaderboard.resource.model

import nl.fastned.leaderboard.service.model.ScoreModel

data class Score(
    val name: String,
    val email: String,
    val seconds: Int
) {
    companion object {
        fun from(score: ScoreModel): Score {
            return Score(
                score.name,
                score.email,
                score.seconds
            )
        }
    }
}
