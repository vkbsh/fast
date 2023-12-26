package nl.fastned.leaderboard.repository

import nl.fastned.leaderboard.repository.entity.ScoreEntity
import org.springframework.data.repository.CrudRepository
import java.util.*

interface ScoreRepository : CrudRepository<ScoreEntity, UUID>
