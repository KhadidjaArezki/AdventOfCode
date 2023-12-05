fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  const possibleGames = data.toString().split(/\n/)
  .reduce((possibleGames, line) => {
    const roundMatches = line.substring(line.indexOf(":")+1, line.length).split(";")
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
    let gameFewestNumOfCubesPerColor = {
      red: 0,
      green: 0,
      blue: 0
    }
    game.rounds.forEach(r => {
      r.forEach(sr => {
        if (sr.color == "red") {
          if (sr.cubes > gameFewestNumOfCubesPerColor.red) gameFewestNumOfCubesPerColor.red = sr.cubes
        }
        else if (sr.color == "green") {
          if (sr.cubes > gameFewestNumOfCubesPerColor.green) gameFewestNumOfCubesPerColor.green = sr.cubes
        }
        else {
          if (sr.cubes > gameFewestNumOfCubesPerColor.blue) gameFewestNumOfCubesPerColor.blue = sr.cubes
        }
      })
    })
    possibleGames.push(gameFewestNumOfCubesPerColor)
    return possibleGames
  }, [])
  const powerSum = possibleGames.reduce((sum, cubeSet) => 
    sum + Object.values(cubeSet)
    .reduce((prd, c) => prd * c, 1)
  , 0)
  console.log(powerSum)
})
