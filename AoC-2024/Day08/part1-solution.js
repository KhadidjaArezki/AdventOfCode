fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  antinodes = new Set()
  let lines = data.toString().split(/\n/)
  for (let j = 0; j < lines.length; j++) {
    for (let i = 0; i < lines[j].length; i++) {
      if (j < lines.length - 2) {
        for (let y = j+1; y < lines.length - 1; y++) {
          // search backwards down
          if (i >= 2) {
            for (let x = 1; x < i; x++) {
              if (lines[y][x] == ".") continue
              let [x2, y2] = [(x-(i-x)), y+(y-j)]
              if (x2 < 0 || x2 > lines[y].length-1 || y2 < 0 || y2 > lines.length-1) continue
              if (lines[y][x] != lines[y2][x2]) continue
              else {
                antinodes.add(`${i},${j}`)
                let [i2, j2] = [x2-(i-x), y2+(y-j)]
                if (i2 >= 0 && i2 < lines[y].length && j2 >= 0 && j2 < lines.length) {
                  antinodes.add(`${i2},${j2}`)
                }
              }
            }
          }     
          // search forward down
          if (i < lines[j].length - 2) {
            for (let x = i+1; x < lines[y].length - 1; x++) {
              if (lines[y][x] == ".") continue
              let [x2, y2] = [x+(x-i), y+(y-j)]
              if (x2 < 0 || x2 > lines[y].length-1 || y2 < 0 || y2 > lines.length-1) continue     
              if (lines[y][x] != lines[y2][x2]) continue
              else {
                antinodes.add(`${i},${j}`)
                let [i2, j2] = [x2+(x-i), y2+(y-j)]
                if (i2 >= 0 && i2 < lines[y].length && j2 >= 0 && j2 < lines.length) {
                  antinodes.add(`${i2},${j2}`)
                }
              }
            }
          }
        }
      }
      if (j >= 2) {
        for (let y = 1; y < j; y++) {
          // search backward up
          if (i >= 2) {
            for (let x = 1; x < i; x++) {
              if (lines[y][x] == ".") continue
              let [x2, y2] = [(x-(i-x)), y-(j-y)]
              if (x2 < 0 || x2 > lines[y].length-1 || y2 < 0 || y2 > lines.length-1) continue
              if (lines[y][x] != lines[y2][x2]) continue
              else {
                antinodes.add(`${i},${j}`)
                let [i2, j2] = [x2-(i-x), y2-(j-y)]
                if (i2 >= 0 && i2 < lines[y].length && j2 >= 0 && j2 < lines.length) {
                  antinodes.add(`${i2},${j2}`)
                }
              }
            }
          }
          // search forward up
          if (i < lines[j].length - 2) {
            for (let x = i+1; x < lines[j].length-1; x++) {
              if (lines[y][x] == ".") continue
              let [x2, y2] = [x+(x-i), y-(j-y)]
              if (x2 < 0 || x2 > lines[y].length-1 || y2 < 0 || y2 > lines.length-1) continue     
              if (lines[y][x] != lines[y2][x2]) continue
              else {
                antinodes.add(`${i},${j}`)
                let [i2, j2] = [x2+(x-i), y2-(j-y)]
                if (i2 >= 0 && i2 < lines[y].length && j2 >= 0 && j2 < lines.length) {
                  antinodes.add(`${i2},${j2}`)
                }
              }
            }
          }
        }
      }
    }
  }
  console.log(antinodes.size)
  
  // for (let j = 0; j < lines.length; j++) {
  //   let line = ""
  //   for (let i = 0; i < lines[j].length; i++) {
  //     line += antinodes.has(`${i},${j}`)? "#" : lines[j][i] 
  //   }
  //   console.log(line)
  // }
})
