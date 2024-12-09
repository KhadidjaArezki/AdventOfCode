fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  let start = []
  // TODO: change to set since obctacles are unique
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

  
  let possibleNewObstacles = 0
  positions = [...positions].slice(1)

  for (let k = 0; k < positions.length; k++) {
    console.log(possibleNewObstacles)
    
    let [i, j] = positions[k].split(",")
    let obstacleHits = { [positions[k]]: 0 }
    x = start[0]
    y = start[1]
    direction = "^"
    
    while (true) {
      let loop = false
      // if same obstacle is hit twice from at least one side, we're in a loop
      for (const obs in obstacleHits) {
        if (obstacleHits[obs] > 4) {
          possibleNewObstacles++
          loop = true
          break
        }
      }
      if (loop) break
      if(x < 0 || x >= lines[0].length ||
          y < 0 || y >= lines.length) break
      
      let obstacle = obstacles.concat([[i, j]]).find(([x0, y0]) => x0 == x && y0 == y)
      if (obstacle != undefined) {
        if (`${x},${y}` in obstacleHits) obstacleHits[`${x},${y}`]++
        else obstacleHits[`${x},${y}`] = 1
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
        if (direction == "^") y--
        else if (direction == ">") x++
        else if (direction == "v") y++
        else x-- 
      }
    }
  }
  console.log(`Answer: ${possibleNewObstacles}`)
})
