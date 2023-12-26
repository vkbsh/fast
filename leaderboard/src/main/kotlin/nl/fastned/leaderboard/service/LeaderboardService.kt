package nl.fastned.leaderboard.service

import nl.fastned.leaderboard.service.model.LeaderboardModel
import nl.fastned.leaderboard.service.model.ScoreModel

interface LeaderboardService {
    fun list(): LeaderboardModel
    fun add(score: ScoreModel)
    fun clear()
}
