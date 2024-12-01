fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let list1 = []
  let list2 = []
  let totDist = 0

  data.toString().split(/\n/).forEach(line => {
    nums = line.split(/\s+/)
    list1.push(nums[0])
    list2.push(nums[1])
  })
  list1.sort()
  list2.sort()
  list1.forEach((num, i) => {
    totDist += Math.abs(num - list2[i])
  })
  console.log(totDist)
  
})
