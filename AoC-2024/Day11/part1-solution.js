fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let stones = data.toString().split(/\s/).map(s => parseInt(s))
  let numBlinks  = 25
  while (numBlinks > 0) {
    numBlinks--
    let newStones = []
    for (const s of stones) {
      if (s == 0) newStones.push(1)
      else if (String(s).length % 2 == 0) newStones.push(
      parseInt(String(s).substring(0, String(s).length/2)),
      parseInt(String(s).substring(String(s).length/2)))
      else newStones.push(s * 2024)  
    }
    stones = newStones
  }
  console.log(stones.length)
})
