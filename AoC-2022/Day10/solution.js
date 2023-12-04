fs = require("fs")

// Result => image drawn by the program
// The image must be a string (40 chars wide, 6 chars high)
// Everytime a clock cycle finishes, the CRT draws a pixel.
// Throughout program execution, the middle of the sprite is represented by currentXRegisterValue
// The sprite is 3 px wide. We need to keep track of the positions of all three pixels and the position of
// the CRT pixel to check if the position of the pixel being drawn by the CRT at any moment matches the
// position of any of three pixels of the sprite.
//

const CYCLE_TO_CONSIDER_INCREMENT = 40
const END_OF_LINE_PIXEL_POSITION_INCREMENT = 40
const CYCLE_NUM_PER_NOOP = 1
const CYCLE_NUM_PER_ADD = 2
const spriteLength = 3
const spriteRightHalfLength = parseInt(spriteLength / 2)
const spriteLeftHalfLength = -spriteRightHalfLength
let nextCycleToConsider = 20
let currentCycleNumber = 0
let currentXRegisterValue = 1
let signalStrengthesToConsider = []
let nextEndOfLinePixelPosition = 40
let currentCRTPixelPosition = 0
let currentSpriteMiddlePosition = 1
let screenDrawing = ""

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

function getCurrentSpriteMiddlePosition(instructionValue) {
  return currentSpriteMiddlePosition + instructionValue
}

fs.readFile("./input.txt", (e, data) => {
  let instructions = data.toString().split(/\n/)
  instructions.forEach((instruction) => {
    const instructionType = getInstructionType(instruction)
    const instructionValue = getInstructionValue(instruction)
    const cycleNumberPerInstruction =
      instructionType === "noop" ? CYCLE_NUM_PER_NOOP : CYCLE_NUM_PER_ADD
    for (let i = 0; i < cycleNumberPerInstruction; i++) {
      // SIDE EFFECTS
      /**  Part 01 */
      // currentCycleNumber++
      // if (currentCycleNumber === nextCycleToConsider) {
      //   nextCycleToConsider = nextCycleToConsider + CYCLE_TO_CONSIDER_INCREMENT
      //   const currentCycleSignalStrength = getCycleSignalStrength(
      //     currentCycleNumber,
      //     currentXRegisterValue
      //   )
      // signalStrengthesToConsider.push(currentCycleSignalStrength)
      // }

      /** Part 02 */
      if (currentCRTPixelPosition == nextEndOfLinePixelPosition) {
        nextEndOfLinePixelPosition =
          nextEndOfLinePixelPosition + END_OF_LINE_PIXEL_POSITION_INCREMENT
        currentSpriteMiddlePosition =
          currentSpriteMiddlePosition + END_OF_LINE_PIXEL_POSITION_INCREMENT
        screenDrawing = screenDrawing.concat("\n")
      }
      let spritePixelMatchesCRT = false
      for (let j = spriteLeftHalfLength; j < spriteRightHalfLength + 1; j++) {
        const spriteJthPixelPosition = currentSpriteMiddlePosition + j
        if (currentCRTPixelPosition == spriteJthPixelPosition) {
          spritePixelMatchesCRT = true
          break
        }
      }
      if (spritePixelMatchesCRT) {
        screenDrawing = screenDrawing.concat("#")
      } else {
        screenDrawing = screenDrawing.concat(".")
      }
      currentCRTPixelPosition++
    }
    currentSpriteMiddlePosition =
      getCurrentSpriteMiddlePosition(instructionValue)
  })
  // const sumOfsignalStrengthesToConsider = sum(signalStrengthesToConsider)
  console.log(screenDrawing)
})
