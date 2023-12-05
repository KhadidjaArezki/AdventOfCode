fs = require("fs")

/**
 * Loop over games
 * for each game:
 *   get game id
 *   for each game round:
 *     get number of red cubes
 *     get number of green cubes
 *     get number of blue cubes
 *     if number of <color> cubes > <color> target: dismiss game
 *     else add game id to possible games array
 * return sum of possible games array
 */

const RED_CUBES_TARGET = 12
const GREEN_CUBES_TARGET = 13
const BLUE_CUBES_TARGET = 14

fs.readFile("./input.txt", (e, data) => {
  const possibleGames = data.toString().split(/\n/)
  .reduce((possibleGames, line) => {
    const roundMatches = line.substring(line.indexOf(": ")+1, line.length).split(";")
    .map(r => r.match(/\s(\d+\s[a-z]+)/g))
    .map(arr => arr.map(s => s.trimStart().split(/\s/)))
    const game = {
      id: parseInt(line.match(/^Game\s(\d+):\s/)[1]),
      rounds: roundMatches.map((r, i) => r.map(sr => {
        return {
          cubes: parseInt(sr[0]),
          color: sr[1]
        }
      }))
    }
    let isPossibleGame = true
    game.rounds.forEach(r => {
      if (!r.every(sr => {
        if (sr.color == "red") return sr.cubes <= RED_CUBES_TARGET
        else if (sr.color == "green") return sr.cubes <= GREEN_CUBES_TARGET
        else return sr.cubes <= BLUE_CUBES_TARGET
      })) {
        isPossibleGame = false
      } 
    })
    if (isPossibleGame) possibleGames.push(game)
    return possibleGames
  }, [])
  console.log(possibleGames.reduce((sum, game) => sum + game.id, 0))
})
