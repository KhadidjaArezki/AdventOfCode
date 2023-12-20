fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  const raceTime = parseInt(lines[0].match(/(\d+)/g).join(""))
  const raceDistance = parseInt(lines[1].match(/(\d+)/g).join(""))
  let numWaysToBeatCurrentRecord = 0
  for (let k = 0; k <= raceTime; k++) {
    const timeToTravel = raceTime - k
    const distanceTraveled = timeToTravel * k
    if (distanceTraveled > raceDistance) numWaysToBeatCurrentRecord++
  }
  console.log(numWaysToBeatCurrentRecord)
})


