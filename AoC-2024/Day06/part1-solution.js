fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  let start = []
  let obstacles = []

  for (let j = 0; j < lines.length; j++) {
    for (let i = 0; i < lines[j].length; i++) {
      if (lines[j][i] == "^") start = [i, j]
      else if (lines[j][i] == "#") obstacles.push([i, j])
    }
  }
  let x = start[0]
  let y = start[1]
  let direction = "^"
  let positions = new Set()
  positions.add(`${x},${y}`)

  while(x >= 0 && x < lines[0].length &&
        y >= 0 && y < lines.length) { 
    if (obstacles.some(([i,j]) => i == x && j == y)) {
      if (direction == "^") {
        direction = ">"
        y++
        x++
      }
      else if (direction == ">") {
        direction = "v"
        x--
        y++
      }
      else if (direction == "v") {
        direction = "<"
        y--
        x--
      }
      else if (direction == "<") {
        direction = "^"
        x++
        y--
      }
    }
    else {
      positions.add(`${x},${y}`)
      if (direction == "^") y--
      else if (direction == ">") x++
      else if (direction == "v") y++
      else x-- 
    }
  }
  console.log(positions.size)
})
