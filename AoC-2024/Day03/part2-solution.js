fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let instructions = data.toString()
  let sum = 0
  let enabledMul = true
  currentIndex = 0
  
  while (currentIndex < instructions.length) {
    if (/do\(\)/.test(instructions.substring(currentIndex, currentIndex+4))) {
      enabledMul = true
      currentIndex += 4
      continue
    } else if (/don't\(\)/.test(instructions.substring(currentIndex, currentIndex+7))) {
      enabledMul = false
      currentIndex += 7
      continue
    } else {
    const matchMul = instructions.substring(currentIndex, currentIndex+12).match(/mul\((\d{1,3},\d{1,3})\)/)
      if (matchMul != null) {
        currentIndex += matchMul[0].length
        if (enabledMul) {
          const nums = matchMul[1].split(",")
          sum += parseInt(nums[0]) * parseInt(nums[1])
        }
      }
      else currentIndex++
    }
  }
  console.log(sum)
})
