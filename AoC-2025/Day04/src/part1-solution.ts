import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  let rows = data.toString().trimEnd().split(/\n/)
  const MAX_ADJACENT_ROLLS = 3
  let numAccessibleRolls = 0
  let accessibleRollsCoords: [number, number][] = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    for (let j = 0; j < row.length; j++) {
      if (rows[i][j] !== '@') continue
      let numAdjacentRolls = 0
      // check upper row
      if (i > 0) {
        if (j > 0 && rows[i - 1][j - 1] === '@') numAdjacentRolls++
        if (rows[i - 1][j] === '@') numAdjacentRolls++
        if (j + 1 < row.length && rows[i - 1][j + 1] === '@') numAdjacentRolls++
      }
      // Check sides
      if (j > 0 && rows[i][j - 1] === '@') numAdjacentRolls++
      if (j + 1 < row.length && rows[i][j + 1] === '@') numAdjacentRolls++
      // Check Lower row
      if (i + 1 < rows.length) {
        if (j > 0 && rows[i + 1][j - 1] === '@') numAdjacentRolls++
        if (rows[i + 1][j] === '@') numAdjacentRolls++
        if (j + 1 < row.length && rows[i + 1][j + 1] === '@') numAdjacentRolls++
      }
      if (numAdjacentRolls <= MAX_ADJACENT_ROLLS) {
        accessibleRollsCoords.push([j, i])
        numAccessibleRolls++
      }
    }
  }
  console.log('number of accessible rolls: ', numAccessibleRolls)
  // console.log('coordinates of accessible rolls: ', accessibleRollsCoords.map(([j, i]) => `(${j},${i})`))
})
