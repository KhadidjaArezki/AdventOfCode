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

  let simScore = 0
  for (let i = 0; i < list1.length; i++) {
    let numCount = 0
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] == list2[j]) numCount++
      else if (list1[i] > list2[j]) continue
      else break
    }
    simScore += (list1[i] * numCount)
  }
  console.log(simScore)
  
})
