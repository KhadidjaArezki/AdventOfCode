fs = require("fs")

const CYCLE_TO_CONSIDER_INCREMENT = 40
const CYCLE_NUM_PER_NOOP = 1
const CYCLE_NUM_PER_ADD = 2
let nextCycleToConsider = 20
let currentCycleNumber = 0
let currentXRegisterValue = 1
let signalStrengthesToConsider = []

function sum(arr) {
  return arr.reduce((agg, n) => agg + n, 0)
}
function getCycleSignalStrength(cycleNumber, XRegisterValue) {
  return cycleNumber * XRegisterValue
}

function getInstructionType(instruction) {
  if (instruction === "noop") return "noop"
  return instruction.split(" ")[0]
}

function getInstructionValue(instruction) {
  if (instruction === "noop") return 0
  return parseInt(instruction.split(" ")[1])
}

function getCurrentXRegisterValue(instructionValue) {
  return currentXRegisterValue + instructionValue
}

fs.readFile("./input.txt", (e, data) => {
  let instructions = data.toString().split(/\n/)
  instructions.forEach((instruction) => {
    const instructionType = getInstructionType(instruction)
    const instructionValue = getInstructionValue(instruction)
    // SIDE EFFECTS!!
    const cycleNumberPerInstruction =
      instructionType === "noop" ? CYCLE_NUM_PER_NOOP : CYCLE_NUM_PER_ADD
    for (let i = 0; i < cycleNumberPerInstruction; i++) {
      // SIDE EFFECTS
      currentCycleNumber++
      if (currentCycleNumber === nextCycleToConsider) {
        nextCycleToConsider = nextCycleToConsider + 40
        const currentCycleSignalStrength = getCycleSignalStrength(
          currentCycleNumber,
          currentXRegisterValue
        )
        signalStrengthesToConsider.push(currentCycleSignalStrength)
      }
    }
    currentXRegisterValue = getCurrentXRegisterValue(instructionValue)
  })
  console.log(sum(signalStrengthesToConsider))
})
