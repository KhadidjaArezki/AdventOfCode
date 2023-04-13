fs = require("fs")

// Play 20 rounds of Monkey in the Middle
// Select the two most active monkeys - those that inspected the greatest number of items
// Calculate Monkey Business - multiply these two numbers together
// - A monkey object consists of four fields: operation(object with 3 fields: operator, fstOp, sndOp),
//   test (object with 3 fields: divideBy, pass, fail), inspected_items, itemsWorryLevels
// - After each turn played by a monkey:
//   - Empty items worry levels list for monkey
//   - Update number of inspected items by monkey
// Before playing: loop through notes and create monkey objects

function computeNewWorryLevel(oldWorryLevel, operation) {
  const op = operation.operator
  const fstTerm =
    operation.fstTerm === "old" ? oldWorryLevel : parseInt(operation.fstTerm)
  const sndTerm =
    operation.sndTerm === "old" ? oldWorryLevel : parseInt(operation.sndTerm)
  let newWorryLevel = -1
  if (op === "+") newWorryLevel = fstTerm + sndTerm
  if (op === "-") newWorryLevel = fstTerm - sndTerm
  if (op === "/") newWorryLevel = fstTerm / sndTerm
  if (op === "*") newWorryLevel = fstTerm * sndTerm
  return Math.floor(newWorryLevel / 3)
}

const NUMBER_OF_ROUNDS = 20

// State
let monkeys = {}

fs.readFile("./input.txt", (e, data) => {
  const notes = data
    .toString()
    .split(/\n\n/)
    .map((note) => note.split(/\n/))

  notes.forEach((note) => {
    const monkeyNumber = note[0].match(/(\d+)/)[0]
    const itemsWorryLevels = note[1]
      .split(":")[1]
      .split(",")
      .map((wl) => parseInt(wl))
    const newWorryLevelOperation = note[2]
      .split(":")[1]
      .split("=")[1]
      .split(" ")
    newWorryLevelOperation.shift()
    const operationParts = newWorryLevelOperation
    const fstTerm = operationParts[0]
    const sndTerm = operationParts[2]
    const operator = operationParts[1]
    const divisionTest = parseInt(note[3].split(":")[1].match(/(\d+)/)[0])
    const testPassedDecision = note[4].split(":")[1].match(/(\d+)/)[0]
    const testFailedDecision = note[5].split(":")[1].match(/(\d+)/)[0]

    // Create monkeys
    const monkey = {}
    monkey.itemsWorryLevels = itemsWorryLevels
    monkey.inspectedItems = 0
    monkey.operation = {
      operator,
      fstTerm,
      sndTerm,
    }
    monkey.test = {
      divideBy: divisionTest,
      pass: testPassedDecision,
      fail: testFailedDecision,
    }

    // SIDE EFFECTS!!!
    monkeys[monkeyNumber] = monkey
  })

  // Play Monkey in the Middle for 20 rounds
  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    /** Play monkey turn:
     * Loop through items:
     * 1. for each inspected item: compute and update worry level via operation
     * 2. test new worry level using division test
     * 3. Decide receiving monkey using test results
     * 4. Push to receiving monkey's itemsWorryLevels list
     * At the end of turn, empty items list
     */
    for (const monkeyNumber in monkeys) {
      const monkey = monkeys[monkeyNumber]
      monkey.itemsWorryLevels.forEach((wl) => {
        const newWorryLevel = computeNewWorryLevel(wl, monkey.operation)
        // SIDE EFFECTS!!!
        monkey.inspectedItems++
        if (newWorryLevel % monkey.test.divideBy === 0) {
          monkeys[monkey.test.pass].itemsWorryLevels.push(newWorryLevel)
        } else monkeys[monkey.test.fail].itemsWorryLevels.push(newWorryLevel)
      })
      monkey.itemsWorryLevels = []
    }
  }
  let numberOfInspections = []
  for (const monkeyNumber in monkeys) {
    const monkey = monkeys[monkeyNumber]
    numberOfInspections.push(monkey.inspectedItems)
  }
  const twoMostActiveMonkeys = numberOfInspections
    .sort((a, b) => b - a)
    .slice(0, 2)
  const monkeyBusiness = twoMostActiveMonkeys[0] * twoMostActiveMonkeys[1]
  console.log(monkeyBusiness)
})
