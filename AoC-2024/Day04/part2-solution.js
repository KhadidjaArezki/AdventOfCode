fs = require("fs")

function reverseStr(str) {
  return [...str].reverse().join("")
}

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  const WORD = "MAS"
  let wordCount = 0
 
  for (let j = 0; j < lines.length; j++) {
    const line = lines[j]
    for (let i = 0; i < line.length; i++) {
      if (i < line.length - 2 && j < lines.length - 2) {
        str1 = line[i]+lines[j+1][i+1]+lines[j+2][i+2]
        if (str1 == WORD || reverseStr(str1) == WORD) {
          str2 = lines[j+2][i]+lines[j+1][i+1]+line[i+2]
          if (str2 == WORD || reverseStr(str2) == WORD) wordCount++
        }
      }
    }
  }
  console.log(wordCount)
  
})