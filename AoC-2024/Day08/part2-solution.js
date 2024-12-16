fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let antinodes = new Set()
  let lines = data.toString().split(/\n/)
  for (let j = 0; j < lines.length - 1; j++) {
    for (let i = 0; i < lines[j].length; i++) {
      if (lines[j][i] == ".") continue
      for (let y = j+1; y < lines.length; y++) {
        // search backwards down
        if (i >= 1) {
          for (let x = 0; x < i; x++) {
            if (lines[y][x] != lines[j][i]) continue
            antinodes.add(`${i},${j}`)
            antinodes.add(`${x},${y}`)
            let [dx, dy] =  [i-x, y-j]
            let x1 = i+dx, y1 = j-dy, x2 = x-dx, y2 = y+dy
            // add antinodes forward up
            while (x1 < lines[j].length && y1 >= 0) {
              antinodes.add(`${x1},${y1}`)
              x1 = x1 + dx
              y1 = y1 - dy
            }
            // add antinodes backward down
            while (x2 >= 0 && y2 < lines.length) {
              antinodes.add(`${x2},${y2}`)
              x2 = x2 - dx
              y2 = y2 + dy
            }
          }
        }
        // search forward down
        if (i < lines[j].length - 1) {
          for (let x = i+1; x < lines[y].length; x++) {
            if (lines[y][x] != lines[j][i]) continue
            antinodes.add(`${i},${j}`)
            antinodes.add(`${x},${y}`)
            let [dx, dy] =  [x-i, y-j]
            let x1 = i-dx, y1 = j-dy, x2 = x+dx, y2 = y+dy
            // add antinodes backward up
            while (x1 >= 0 && y1 >= 0) {
              antinodes.add(`${x1},${y1}`)
              x1 = x1 - dx
              y1 = y1 - dy
            }
            // add antinodes forward down
            while (x2 < lines[y].length && y2 < lines.length) {
              antinodes.add(`${x2},${y2}`)
              x2 = x2 + dx
              y2 = y2 + dy
            }
          }
        }
      }
    }
  }
  console.log(antinodes.size)
  // for (let j = 0; j < lines.length; j++) {
    // let line = ""
    // for (let i = 0; i < lines[j].length; i++) {
      // line += antinodes.has(`${i},${j}`)
      // ? lines[j][i] == "."? "#" : lines[j][i] 
      // : lines[j][i]
    // }
    // console.log(line)
  // }
})