fs = require("fs")

function reverseStr(str) {
  return [...str].reverse().join("")
}

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  const WORD = "XMAS"
  let wordCount = 0
 
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j]
    for (let i = 0; i < line.length; i++) {
      // Horizontal check
      if (i < line.length - 3) {
        let str = line.substring(i, i+4)
        
        if (str == WORD) {
          wordCount++
        }
        else if (reverseStr(str) == WORD) {
          wordCount++
        }
      }
      // Vertical Check
      if (j < lines.length - 3) {
        str = line[i]+lines[j+1][i]+lines[j+2][i]+lines[j+3][i]
        if (str == WORD) {
          wordCount++
        }
        else if (reverseStr(str) == WORD) {
          wordCount++
        }
      }
      // Diagonals check
      if (i < line.length - 3 && j < lines.length - 3) {
        str = line[i]+lines[j+1][i+1]+lines[j+2][i+2]+lines[j+3][i+3]
        if (str == WORD) {
          wordCount++
        }
        else if (reverseStr(str) == WORD) {
          wordCount++
        }
      }
      if (i >= 3 && j < lines.length - 3) {
        str = line[i]+lines[j+1][i-1]+lines[j+2][i-2]+lines[j+3][i-3]
        if (str == WORD) {
          wordCount++
        }
        else if (reverseStr(str) == WORD) {
          wordCount++
        }
      }
    }
  }
  console.log(wordCount)
  
})
