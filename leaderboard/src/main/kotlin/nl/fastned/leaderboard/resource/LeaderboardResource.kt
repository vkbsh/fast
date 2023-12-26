package nl.fastned.leaderboard.resource

import nl.fastned.leaderboard.resource.model.Leaderboard
import nl.fastned.leaderboard.resource.model.Score
import nl.fastned.leaderboard.service.LeaderboardService
import nl.fastned.leaderboard.service.model.ScoreModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/leaderboard"])
class LeaderboardResource(
    val leaderboardService: LeaderboardService
) {
    @RequestMapping(method = [RequestMethod.GET])
    fun list(): ResponseEntity<Leaderboard> {
        return ResponseEntity(
            Leaderboard.from(leaderboardService.list()),
            HttpStatus.OK
        )
    }

    @RequestMapping(method = [RequestMethod.POST])
    fun add(@RequestBody score: Score): ResponseEntity<Leaderboard> {
        leaderboardService.add(ScoreModel.from(score))
        return list()
    }

    @RequestMapping(method = [RequestMethod.DELETE])
    fun clear(): ResponseEntity<Leaderboard> {
        leaderboardService.clear()
        return list()
    }
}
