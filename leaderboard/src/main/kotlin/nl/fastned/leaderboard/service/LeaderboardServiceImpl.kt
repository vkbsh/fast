package nl.fastned.leaderboard.service

import nl.fastned.leaderboard.repository.ScoreRepository
import nl.fastned.leaderboard.repository.entity.ScoreEntity
import nl.fastned.leaderboard.service.model.LeaderboardModel
import nl.fastned.leaderboard.service.model.ScoreModel
import org.springframework.stereotype.Service

@Service
class LeaderboardServiceImpl(
    val scoreRepository: ScoreRepository
) : LeaderboardService {
    override fun list(): LeaderboardModel {
        val scores = scoreRepository.findAll()
        return LeaderboardModel(
            scores.map {
                ScoreModel.from(it)
            }
        )
    }

    override fun add(score: ScoreModel) {
        scoreRepository.save(
            ScoreEntity.from(score)
        )
    }

    override fun clear() {
        scoreRepository.deleteAll()
    }
}
