fs = require("fs")

function isSorted(arr) {
  if (isIncreasing(arr)) return true
  else if (isDecreasing(arr)) return true
  else return false
}
 
function isIncreasing(arr) {
  let sorted = true
  for (let i = 0; i < arr.length - 1; i++) {
    if (+arr[i] > +arr[i+1]) {
      sorted = false
      break
    }
  }
  return sorted
}
function isDecreasing(arr) {
  let sorted = true
  for (let i = 0; i < arr.length - 1; i++) {
    if (+arr[i] < +arr[i+1]) {
      sorted = false
      break
    }
  }
  return sorted
}

fs.readFile("./input.txt", (e, data) => {
  let unSafeReports = 0

  const reports = data.toString().split(/\n/)
  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i].split(/\s/)
    if (!isSorted(levels)) {
      unSafeReports += 1
      continue
    }
   
    let safe = true
    for (let j = 0; j < levels.length - 1; j++) {
      if ((Math.abs(levels[j] - levels[j+1]) < 1) ||
          (Math.abs(levels[j] - levels[j+1]) > 3)) {
        safe = false
        break
      }
    }
    if (!safe) {
      unSafeReports += 1
    }
  }
  console.log(reports.length - unSafeReports)
})
