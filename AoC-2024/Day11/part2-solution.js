fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let initialStones = data.toString().split(/\s/).map(s => parseInt(s))
  let stones = {}
  for (const s of initialStones) {
    stones[s] = 1
  }

  let numBlinks = 75 
  while(numBlinks > 0) {
    numBlinks--
    let newStonesObj = {}
    // each new stone is added as many times as the count of the previous stone
    for (const s in stones) {
      if (s == 0) {
        const newStone = 1
        newStonesObj[newStone] = newStone in newStonesObj? newStonesObj[newStone] + stones[s]: stones[s]
      }
      else if (String(s).length % 2 == 0) {
        const newStone1 = parseInt(String(s).substring(0, String(s).length/2))
        const newStone2 = parseInt(String(s).substring(String(s).length/2))
        newStonesObj[newStone1] = newStone1 in newStonesObj? newStonesObj[newStone1] + stones[s]: stones[s]
        newStonesObj[newStone2] = newStone2 in newStonesObj? newStonesObj[newStone2] + stones[s]: stones[s]
      }
      else {
        const newStone = s * 2024
        newStonesObj[newStone] = newStone in newStonesObj? newStonesObj[newStone] + stones[s]: stones[s]
      }
    }
    stones = newStonesObj
  }
  let result = Object.values(stones).reduce((acc, next) => acc+next)
  console.log(result)
})
