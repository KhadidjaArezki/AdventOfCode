fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let scoresSum = 0
  let lines = data.toString().split(/\n/)
  lines.forEach((line, i) => {
    let trailHeads = []
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "0") trailHeads.push(j)
    }

    for (let t of trailHeads) {
      let trailPositions = [[i, t]]
      currentTrailHeadVal = 0
      while (currentTrailHeadVal < 9) {
        currentTrailHeadVal += 1
        let newTrailPositions = []
        for (const pos of trailPositions) {
          const [y, x] = pos
          if (x > 0 && lines[y][x-1] == currentTrailHeadVal) {
            newTrailPositions.push([y, x-1])
          }
          if (x < lines[y].length-1 && lines[y][x+1] == currentTrailHeadVal) {
            newTrailPositions.push([y, x+1])
          }
          if (y > 0 && lines[y-1][x] == currentTrailHeadVal) {
            newTrailPositions.push([y-1, x])
          }
          if (y < lines.length-1 && lines[y+1][x] == currentTrailHeadVal) {
            newTrailPositions.push([y+1, x])
          }
        }
        trailPositions = newTrailPositions
      }
      finalPositions = new Set()
      for (const [y, x] of trailPositions) {
        finalPositions.add(`${y},${x}`)
      }
      scoresSum += finalPositions.size
    }
  })
  console.log(scoresSum)
})
