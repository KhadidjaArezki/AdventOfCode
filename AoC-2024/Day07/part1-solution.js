fs = require("fs")

function applySeq(opSeq, nums) {
  let r = nums[0]
  for (let k = 1; k < nums.length; k++) {
    if (opSeq[k-1] == "+") r += nums[k]
    else r *= nums[k]
  }
  return r
}

const combinations = (arr, depth) => {
  if (depth === 1) return arr
  return combinations(arr, depth - 1).flatMap((val) =>
    arr.map((char) => val + char)
  )}

fs.readFile("./input.txt", (e, data) => {
  let ops = ["+", "*"]
  let sum = 0

  data.toString().split(/\n/).forEach( e => {
    let [r, nums] = e.split(": ")
    r = parseInt(r)
    nums = nums.split(/\s/).map(n => parseInt(n))
    let match = false
    const opCombs = combinations(ops, nums.length - 1)
    for (const opSeq of opCombs) {
      if (applySeq(opSeq, nums) == r) {
        sum += r
        break
      }
    }
  })
  console.log(sum)
})
