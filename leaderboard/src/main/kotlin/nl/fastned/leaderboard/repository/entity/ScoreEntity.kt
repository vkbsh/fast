package nl.fastned.leaderboard.repository.entity

import nl.fastned.leaderboard.service.model.ScoreModel
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.util.*

@Table("scores")
data class ScoreEntity(
    @Id val id: UUID? = null,
    val name: String,
    val email: String,
    val seconds: Int
) {
    companion object {
        fun from(score: ScoreModel): ScoreEntity {
            return ScoreEntity(
                name = score.name,
                email = score.email,
                seconds = score.seconds
            )
        }
    }
}
