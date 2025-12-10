/*
 * digit at the top and the least significant digit at the bottom.
 * (Problems are still separated with a column consisting only of spaces,
 * and the symbol at the bottom of the problem is still the operator to use.)
 * */

import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  const problems = data.toString().split(/\n\n/)
  const operatorsStr = problems[1]
  // const operators = operatorsStr.split(/\s+/)
  const operandsStrs = problems[0].split(/\n/)
  let sumResults = 0
  for (let i = 0; i < operatorsStr.length;) {
    let nums = ''
    let numsMat: string[][] = []
    const regex = /[^\s]/
    const match = operatorsStr.substring(i + 1).match(regex)
    const nextProblemIdx = match?.index ? match.index + i + 1 : operatorsStr.length + 1
    for (const operandStr of operandsStrs) {
      const num = operandStr.substring(i, nextProblemIdx - 1)
      nums += `${num}\n`
    }
    numsMat = nums.split(/\n/).map(line => {
      const numsArr: string[] = []
      for (let i = 0; i < line.length; i++) {
        numsArr.push(line[i])
      }
      return numsArr
    })
    numsMat.pop()
    const op = operatorsStr[i]
    let result = op === '+' ? 0 : 1
    for (let j = 0; j < numsMat[0].length; j++) {
      let num = ''
      for (let m = 0; m < numsMat.length; m++) {
        if (!isNaN(Number(numsMat[m][j]))) {
          num += numsMat[m][j]
        }
      }
      result = op === '+' ? result + parseInt(num) : result * parseInt(num)
    }
    sumResults += result
    i = nextProblemIdx
  }
  console.log(sumResults)
})
