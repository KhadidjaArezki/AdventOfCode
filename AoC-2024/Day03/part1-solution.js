fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let instructions = data.toString()
  let matches = instructions.match(/mul\(\d{1,3},\d{1,3}\)/g)
  let sum = 0
  matches.forEach(m => {
    const nums = m.match(/(\d{1,3}),(\d{1,3})/).slice(1,3)
    sum += parseInt(nums[0]) * parseInt(nums[1])
  })
  console.log(sum)
})
