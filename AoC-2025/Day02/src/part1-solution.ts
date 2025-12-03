/*
 * find the invalid IDs by looking for any ID which is
 * made only of some sequence of digits repeated twice. 
 * So, 55 (5 twice),
 * 6464 (64 twice), and
 * 123123 (123 twice) would all be invalid IDs.
 *
 * Should we just create a list of all numbers in the range and then check their strings
 * Or is there a way to predict the existence of these invalid numbers without creating the list
 */
import * as fs from "fs"

function getRange(start: number, end: number) {
  const rangeNums: number[] = []
  for (let num = start; num <= end; num++) {
    rangeNums.push(num)
  }
  return rangeNums
}

function sum(...arr: number[]) {
  return arr.reduce((acc, num) => {
    return acc + num
  }, 0)
}

fs.readFile("./input.txt", (e, data) => {
  let idRanges = data.toString().trimEnd().split(',')
  const invalidIds: number[] = []
  idRanges.forEach((idRange) => {
    const [startId, endId] = idRange.split('-')
    const rangeNums = getRange(parseInt(startId), parseInt(endId))
    rangeNums.forEach((num) => {
      const numStr = num.toString()
      let pattern = ''
      for (let i = 0; i < numStr.length; i++) {
        if (numStr.slice(i) === pattern) {
          invalidIds.push(num)
          continue
        } else {
          pattern += numStr[i]
        }
      }
    })
  })
  console.log(sum(...invalidIds))
})
