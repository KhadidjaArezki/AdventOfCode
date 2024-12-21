fs = require("fs")

const sum = (arr) => arr.reduce((acc, n) => acc+n, 0)

fs.readFile("./input.txt", (e, data) => {
  string = data.toString()
  
  /*let blocks = ""
  let id = 0
  for (let i = 0; i < string.length; i++) {
    if (i % 2 == 0) {
      for (let j = 0; j < string[i]; j++) {
        blocks += `${id}`
      }
      id++
    }
    else {
      for (let j = 0; j < string[i]; j++) {
        blocks += "."
      }
    }
  }
  
  let lastIndexOfBlock = blocks.length-1
  for (let k = 0; k < blocks.length; k++) {
    if (lastIndexOfBlock == k) break
    if (blocks[k] == ".") {
      lastIndexOfBlock = getLastIndexOfBlock(blocks, lastIndexOfBlock)
      blocks = blocks.substring(0, k) + blocks[lastIndexOfBlock] + 
      blocks.substring(k+1, lastIndexOfBlock) + "." + blocks.substring(lastIndexOfBlock+1)
    }
  }
  
  checkSum = 0
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] == ".") break
    checkSum += i*parseInt(blocks[i])
  }
  */
  let id_counts = []
  let freeSpaceCounts = []
  for (let i = 0; i < string.length; i++) {
    if (i % 2 == 0) id_counts.push(parseInt(string[i]))
    else freeSpaceCounts.push(parseInt(string[i]))
  }

  let checkSum = 0
  let k = id_counts.length-1
  let m = 0
  let pos = 0
  let numBlocks = sum(id_counts)
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
    for (let l = 0; l < freeSpaceCounts[m]; l++) {
      if (pos >= numBlocks) {
        done = true
        break
      }
      checkSum += (k * pos)
      newfreeSpaceCount--
      id_counts[k]--
      pos++
      if (id_counts[k] == 0) {
        k--
      }
    }
    if (done) break
    freeSpaceCounts[m] = newfreeSpaceCount
    if (freeSpaceCounts[m] == 0) {
      m++
    }
  }
  console.log(checkSum)
})
