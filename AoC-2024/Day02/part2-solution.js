fs = require("fs")

function countIrreg(arr) {
  const incrIrreg = indicesToRemoveIncr(arr)
  const decrIrreg = indicesToRemoveDecr(arr)

  if (incrIrreg.length < decrIrreg.length) return incrIrreg
  else return decrIrreg
}
function indicesToRemoveIncr(arr) {
  let irregIndices = [] 
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= arr[i+1]) {
      if (i == arr.length - 2) {
        if ((Math.abs(arr[i-1] - arr[i]) <= 3) && Math.abs(arr[i-1] - arr[i]) >= 1) irregIndices.push(i+1)
        else irregIndices.push(i)
      }
      else if (i == 0) {
        if ((Math.abs(arr[i+1] - arr[i+2]) > 3) || (Math.abs(arr[i+1] - arr[i+2] < 1))) irregIndices.push(i+1)
        else irregIndices.push(i)
      }
      else if ((Math.abs(arr[i-1] - arr[i]) <= 3) && (Math.abs(arr[i] - arr[i+2]) <= 3) &&
              (Math.abs(arr[i-1] - arr[i]) >= 1) && (Math.abs(arr[i] - arr[i+2]) >= 1)) irregIndices.push(i+1)
      else irregIndices.push(i)
    }
  }
  return irregIndices
}
function indicesToRemoveDecr(arr) {
  let irregIndices = [] 
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= arr[i+1]) {
      if (i == arr.length - 2) {
        if ((Math.abs(arr[i-1] - arr[i]) <= 3) && Math.abs(arr[i-1] - arr[i]) >= 1) irregIndices.push(i+1)
        else irregIndices.push(i)
      }
      else if (i == 0) {
        if (Math.abs(arr[i+1] - arr[i+2]) > 3 || (Math.abs(arr[i+1] - arr[i+2] < 1))) irregIndices.push(i+1)
        else irregIndices.push(i)
      }
      else if ((Math.abs(arr[i-1] - arr[i]) <= 3) && (Math.abs(arr[i] - arr[i+2]) <= 3) &&
               (Math.abs(arr[i-1] - arr[i]) >= 1) && (Math.abs(arr[i] - arr[i+2]) >= 1)) irregIndices.push(i+1)
      else irregIndices.push(i)
    }
  }
  return irregIndices
}

fs.readFile("./input.txt", (e, data) => {
  let unSafeReports = 0

  const reports = data.toString().split(/\n/)
  for (let i = 0; i < reports.length; i++) {
    let levels = reports[i].split(/\s/)
    levels = levels.map(s => parseInt(s))
    // console.log(`report ${i+1}: ${levels}`)
    
    const irregIndices = countIrreg(levels)
    let modified = false
    if (irregIndices.length > 1) {
      unSafeReports += 1
      // console.log(`report ${i+1}: ${levels} is unsafe - more than one bad level`)
      continue
    }
    else if (irregIndices.length == 1) {
      levels.splice(irregIndices[0], 1)
      // console.log(`report ${i+1}: ${levels} has been modified`)
      modified = true
    }
   
    let safe = true
    let irregDiffIndices = []
    for (let j = 0; j < levels.length - 1; j++) {
      if ((Math.abs(levels[j] - levels[j+1]) > 3) || (Math.abs(levels[j] - levels[j+1]) < 1)) {
        if (modified) {
          safe = false
          // console.log(`report ${i+1}: ${levels} is unsafe`)
          break
        }
        if (j == levels.length - 2) irregDiffIndices.push(j+1)
        else irregDiffIndices.push(j)
      }
      if (irregDiffIndices.length > 1) {
        safe = false
        break
      }
    }
    if (irregDiffIndices.length == 1) {
      if (irregDiffIndices[0] != 0 && irregDiffIndices[0] != levels.length - 1) {
      // console.log(`report ${i+1}: ${levels} is unsafe`)
        safe = false
      }
    }
    if (!safe) {
      unSafeReports += 1
      // console.log(`report ${i+1}: ${levels} is unsafe - modified: ${modified}`)
    } 
  }
  console.log(reports.length - unSafeReports)
})