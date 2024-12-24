fs = require("fs")

const sum = (arr) => arr.reduce((acc, n) => acc+n, 0)
const get1stIdxOfAtLeast = (map , num, pos) => {
  for (const k in map) {
    if (k >= num) {
      let idx = Math.min(...map[k])
      if (idx > pos) break
      map[k].splice(map[k].indexOf(idx), 1)
      if (map[k].length == 0) delete map[k]
      return [k, idx]
    }
  }
  return false
}

fs.readFile("./input.txt", (e, data) => {
  string = data.toString()
  
  let id_counts = []
  let freeSpaceCounts = []
  for (let i = 0; i < string.length; i++) {
    if (i % 2 == 0) id_counts.push(parseInt(string[i]))
    else freeSpaceCounts.push(parseInt(string[i]))
  }

  let freeSpaceMap = {}
  let freeSpacePos = id_counts[0]
  for (let i = 0; i < freeSpaceCounts.length; i++) {
    if (freeSpaceCounts[i] > 0) {
      if (freeSpaceCounts[i] in freeSpaceMap) {
       freeSpaceMap[freeSpaceCounts[i]].push(freeSpacePos)
      } else {
        freeSpaceMap[freeSpaceCounts[i]] = [freeSpacePos]
      }
      freeSpacePos += freeSpaceCounts[i] + id_counts[i+1]
    }
  }
  
  let numBlocks = sum(id_counts) + sum(freeSpaceCounts)
  let rear_pos = numBlocks-1
  let checkSum = 0
  let k = id_counts.length-1
  while (k >= 0) {
    let result = get1stIdxOfAtLeast(freeSpaceMap, id_counts[k], rear_pos)
    
    if (!result) {
      for (let l = 0; l < id_counts[k]; l++) {
        checkSum += (k * rear_pos)
        rear_pos--
      }
    } else {
      let [freeSpaceCount, idx] = result
      let newfreeSpaceCount = freeSpaceCount
      for (let l = 0; l < id_counts[k]; l++) {
        checkSum += (k * idx)
        newfreeSpaceCount--
        idx++ 
        rear_pos--
      }
      if (newfreeSpaceCount > 0) {
        if (newfreeSpaceCount in freeSpaceMap) freeSpaceMap[newfreeSpaceCount].push(idx)
        else freeSpaceMap[newfreeSpaceCount] = [idx]
      }
    }
    if (k >= 0) rear_pos -= freeSpaceCounts[k-1]
    k--
    // console.log(checkSum)
  }
  console.log(checkSum)
  
  /*
  while (pos < numBlocks) {
    let done = false
    for (let p = 0; p < id_counts[m]; p++) {
      if (pos >= numBlocks) {
        done = true
        break
      }
      checkSum += (m * pos)
      pos++
    }
    let newfreeSpaceCount = freeSpaceCounts[m]
    if (id_counts[k] <= freeSpaceCounts[m]) {
      for (let l = 0; l < freeSpaceCounts[m]; l++) {
        if (pos >= numBlocks) {
          done = true
          break
        }
        checkSum += (k * pos)
        newfreeSpaceCount--
        id_counts[k]--
        pos++ 
      }
      k--
    } else {

    }
    if (done) break
    freeSpaceCounts[m] = newfreeSpaceCount
    if (freeSpaceCounts[m] == 0) {
      m++
    }
  }
  console.log(checkSum)
  */
})
