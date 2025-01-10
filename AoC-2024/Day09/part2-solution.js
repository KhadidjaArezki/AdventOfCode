fs = require("fs")

const sum = (arr) => arr.reduce((acc, n) => acc+n, 0)

fs.readFile("./sinput.txt", (e, data) => {
  string = data.toString()
  
  let id_counts = []
  let freeSpaceCounts = []
  for (let i = 0; i < string.length; i++) {
    if (i % 2 == 0) id_counts.push(parseInt(string[i]))
    else freeSpaceCounts.push(parseInt(string[i]))
  }
  
  let numBlocks = sum(id_counts) + sum(freeSpaceCounts)
  let rear_pos = numBlocks-1
  let checkSum = 0
  let k = id_counts.length-1
  let m = k-1
  let freeSpaceCountsCopy = freeSpaceCounts.slice(0, freeSpaceCounts.length)
  
  while (k >= 0) {
    let foundIdx = false
    let idx
    let freeSpaceCountIdx
    for (let i = 0; i < k; i++) {
      if (freeSpaceCountsCopy[i] >= id_counts[k]) {
        idx = sum(id_counts.slice(0, i+1).concat(freeSpaceCounts.slice(0, i))) + 
              (freeSpaceCounts[i] - freeSpaceCountsCopy[i])
        
        freeSpaceCountIdx = i
        foundIdx = true
        break
      }
    }
    
    if (foundIdx) {
      let newfreeSpaceCount = freeSpaceCountsCopy[freeSpaceCountIdx]
      
      for (let l = 0; l < id_counts[k]; l++) {
        checkSum += (k * idx)
        newfreeSpaceCount--
        idx++ 
        rear_pos--
      }
      freeSpaceCountsCopy[freeSpaceCountIdx] = newfreeSpaceCount
    } else {
      for (let l = 0; l < id_counts[k]; l++) {
        checkSum += (k * rear_pos)
        rear_pos--
      }
    } 
    rear_pos -= freeSpaceCounts[m]
    k--
    m--
  }
  console.log(checkSum)
})