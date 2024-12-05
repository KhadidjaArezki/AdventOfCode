fs = require("fs")

function countBadLevels(nums) {
  let pos = neg = bad = 0
  for (let i = 0; i < nums.length - 1; i++) {
    const diff = nums[i] - nums[i+1]
    if (diff == 0 || Math.abs(diff) > 3) bad++
    else if (diff > 0) pos++
    else neg++
  }
  
  if (pos >= neg) bad += neg
  else bad += pos
  return bad
}

fs.readFile("./input.txt", (e, data) => {
  const reports = data.toString().split(/\n/)
  let safeReports = 0
  let savable = []

  for (let i = 0; i < reports.length; i++) {
    let levels = reports[i].split(/\s/)
    levels = levels.map(s => parseInt(s))

    const numBadLevels = countBadLevels(levels)
    if (numBadLevels < 1) {
      safeReports++
      continue
    }
    else savable.push(i)
  }
  
  
  for (let i = 0; i < savable.length; i++) {
    let levels = reports[savable[i]].split(/\s/)
    levels = levels.map(s => parseInt(s))
    
    for (let j = 0; j < levels.length; j++) {
      if (countBadLevels(levels.slice(0, j).concat(levels.slice(j+1, levels.length))) == 0) {
        safeReports++
        break
      }
    }
  }
  console.log(safeReports)
})