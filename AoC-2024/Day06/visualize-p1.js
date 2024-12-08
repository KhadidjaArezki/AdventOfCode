fs = require("fs")

const clearLines = (n) => {
  for (let i = 0; i < n; i++) {
    //first clear the current line, then clear the previous line
    const y = i === 0 ? null : -1
    process.stdout.moveCursor(0, y)
    process.stdout.clearLine(1)
  }
  process.stdout.cursorTo(0)
}

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  let start = []
  let obstacles = []
  
  const SCREEN_HEIGHT = 43
  const MID_SCREEN = 21

  for (let j = 0; j < lines.length; j++) {
    for (let i = 0; i < lines[j].length; i++) {
      if (lines[j][i] == "^") start = [i, j]
      else if (lines[j][i] == "#") obstacles.push([i, j])
    }
  }
  let x = start[0]
  let y = start[1]
  let direction = "^"

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
    } // ▬ ▮ ■ ◼ ▪ █ ●◉
    else {
      let d = direction == ">"? "➡" : direction == "<"? "⬅" : direction == "^"? "⬆" : "⬇"
      lines[y] = lines[y].substring(0, x) + d + lines[y].substring(x+1)
      clearLines(lines.length+1)
      let [l, h] = lines.length <= SCREEN_HEIGHT?
                  [0, lines.length-1]:  y <= MID_SCREEN?
                  [0, SCREEN_HEIGHT] : (y-MID_SCREEN + SCREEN_HEIGHT) >= lines.length?
                  [y-MID_SCREEN, lines.length-1] : [y-MID_SCREEN, (y-MID_SCREEN + SCREEN_HEIGHT)]
      for (let k = l; k <= h; k++) {
      let spaces = String(k+1).length == 3? " ": String(k+1).length == 2? "  ": "   "
        process.stdout.write(`${k+1} ${spaces} ${lines[k]}\n`)
      }
      var waitTill = new Date(new Date().getTime() + 70)
      while(waitTill > new Date()){}

      if (direction == "^") y--
      else if (direction == ">") x++
      else if (direction == "v") y++
      else x-- 
      }
    }
  })