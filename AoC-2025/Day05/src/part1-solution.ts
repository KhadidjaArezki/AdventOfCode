/*
 * The database operates on ingredient IDs. It consists of a list of fresh
 * ingredient ID ranges, a blank line, and a list of available ingredient IDs.
 * */

import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  const [freshVeggieIdRangesStr, availableVeggieIdsStr] = data.toString().trimEnd().split(/\n\n/)
  let numFreshVeggies = 0
  const freshVeggieIdRanges = freshVeggieIdRangesStr.trimEnd().split(/\n/)
    .map(range => range.split('-')
      .map(numStr => parseInt(numStr)))
  const availableVeggieIds = availableVeggieIdsStr.trimEnd().split(/\n/)
  for (const availableVeggieId of availableVeggieIds) {
    const veggieId = parseInt(availableVeggieId)
    for (const freshVeggieIdRange of freshVeggieIdRanges) {
      const [start, end] = freshVeggieIdRange
      if (veggieId >= start && veggieId <= end) {
        numFreshVeggies++
        break
      }
    }
  }
  console.log(numFreshVeggies)
})
