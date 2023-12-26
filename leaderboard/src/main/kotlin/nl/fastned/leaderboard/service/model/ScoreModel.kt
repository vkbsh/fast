package nl.fastned.leaderboard.service.model

import nl.fastned.leaderboard.repository.entity.ScoreEntity
import nl.fastned.leaderboard.resource.model.Score

data class ScoreModel(
    val name: String,
    val email: String,
    val seconds: Int
) {
    companion object {
        fun from(score: ScoreEntity): ScoreModel {
            return ScoreModel(
                score.name,
                score.email,
                score.seconds
            )
        }

        fun from(score: Score): ScoreModel {
            return ScoreModel(
                score.name,
                score.email,
                score.seconds
            )
        }
    }
}
