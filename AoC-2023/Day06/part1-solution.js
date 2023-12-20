fs = require("fs")

const STARTING_SPEED = 0
const VELOCITY_PER_MILLISECOND = 1

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  const racesTimes = lines[0].match(/(\d+)/g).map(n => +n)
  const racesDistances = lines[1].match(/(\d+)/g).map(n => +n)
  let waysToBeatRecordPerRace = []
  racesTimes.forEach((raceTime, i) => {
    let numWaysToBeatCurrentRecord = 0
    const recordDistance = racesDistances[i]
    for (let k = 0; k <= raceTime; k++) {
      const timeToTravel = raceTime - k
      const distanceTraveled = timeToTravel * k
      if (distanceTraveled > recordDistance) numWaysToBeatCurrentRecord++
    }
    waysToBeatRecordPerRace.push(numWaysToBeatCurrentRecord)
  })
  console.log(waysToBeatRecordPerRace.reduce((pdt, n) => pdt * n, 1))
})


