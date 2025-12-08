/*
 * The database operates on ingredient IDs. It consists of a list of fresh
 * ingredient ID ranges, a blank line, and a list of available ingredient IDs.
 * Find all of the IDs that the fresh ingredient ID ranges consider to be fresh.
 * */

import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  const freshVeggieIdRangesStr = data.toString().trimEnd().split(/\n\n/)[0]
  let numFreshVeggiesIds = 0
  const sortedFreshVeggieIdRanges = freshVeggieIdRangesStr.trimEnd().split(/\n/)
    .map(range => range.split('-')
      .map(numStr => parseInt(numStr)))
    .sort((p1, p2) => {
      const [start1, end1] = p1
      const [start2, end2] = p2
      if (start1 < start2) return -1
      else if (start1 === start2) {
        if (end1 < end2) return -1
        else return 1
      } else return 1
    })

  for (let i = 0; i < sortedFreshVeggieIdRanges.length; i++) {
    let [start, end] = sortedFreshVeggieIdRanges[i]
    if (i > 0) {
      const [prevStart, prevEnd] = sortedFreshVeggieIdRanges[i - 1]
      if (start === prevStart && end === prevEnd) continue
      if (end <= prevEnd) continue
      if (start <= prevEnd) {
        start = prevEnd + 1
      }
    }
    // console.log(`${i}: ${start}, ${end}`)
    numFreshVeggiesIds += end - start + 1
  }
  console.log(numFreshVeggiesIds)
})
