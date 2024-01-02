fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n\n/)
  const instructions = lines[0]
  const network = lines[1].split(/\n/).reduce((obj, line) => {
    const nodeName = line.match(/^([A-Z]{3})\s=/)[1]
    obj[nodeName] = {
      left: line.match(/\(([A-Z]{3}),/)[1],
      right: line.match(/,\s([A-Z]{3})\)/)[1]
    }
    return obj
  }, {})

  let currentNode = "CTK"
  let steps = 0
  while (currentNode !== 'ZZZ') {
    // Get the left/right instruction based on the steps counter
    let instruction = instructions[steps % instructions.length]
    if (instruction === 'L') {
        currentNode = network[currentNode].left
    } else if (instruction === 'R') {
        currentNode = network[currentNode].right
    } 
    steps++
  }
  console.log(`Number of steps required to reach ZZZ: ${steps}`) // 11567
})
