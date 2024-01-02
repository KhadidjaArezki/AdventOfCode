fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n\n/)
  const instructions = lines[0]
  const network = lines[1].split(/\n/).reduce((obj, line) => {
    const nodeName = line.match(/^([A-Z0-9]{3})\s=/)[1]
    obj[nodeName] = {
      left: line.match(/\(([A-Z0-9]{3}),/)[1],
      right: line.match(/,\s([A-Z0-9]{3})\)/)[1]
    }
    return obj
  }, {})

  let startingNodes = Object.keys(network).reduce((agg, key) => {
    if (/[A-Z0-9]{2}A/.test(key)) agg.push(key)
    return agg
  }, [])

  const stepsToGoal = startingNodes.map(node => {
    let steps = 0
    currentNode = node
    while (!/[A-Z0-9]{2}Z/.test(currentNode)) {
      // Get the left/right instruction based on the steps counter
      let instruction = instructions[steps % instructions.length]
      if (instruction === 'L') currentNode = network[currentNode].left
      else if (instruction === 'R') currentNode = network[currentNode].right
      steps++
    }
    return steps
  })

  // const gcd = (a, b) => a ? gcd(b % a, a) : b
  const gcd = (a, b) => b == 0 ? a : gcd(b, a % b) //11795205644011
  const lcm = (a, b) => a * b / gcd(a, b)

  const answer = stepsToGoal.reduce(lcm)
  console.log(`Number of steps required to reach ZZZ: ${answer}`)
})
