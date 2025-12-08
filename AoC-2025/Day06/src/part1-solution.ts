/*
 * Each problem's numbers are arranged vertically;
 * at the bottom of the problem is the symbol for the operation that needs to be performed.
 * Problems are separated by a full column of only spaces.
 * The left/right alignment of numbers within each problem can be ignored.
 * */

import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  const problems = data.toString().trimEnd().split(/\n/)
  const operators = problems[problems.length - 1].trimStart().trimEnd().split(/\s+/)
  const operands = problems.slice(0, problems.length - 1).map(operandStr => operandStr.trimStart().trimEnd().split(/\s+/))
  let sumResults = 0

  for (let i = 0; i < operators.length; i++) {
    let result = operators[i] === '+' ? 0 : 1
    for (const operand of operands) {
      const num = parseInt(operand[i])
      result = operators[i] === '+' ? result + num : result * num
    }
    sumResults += result
  }
  console.log(sumResults)
})
