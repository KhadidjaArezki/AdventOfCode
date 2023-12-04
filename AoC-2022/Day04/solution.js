fs = require("fs")

// Create list [a,b,c] from range a-c
function listFromRange(range) {
  let [start, end] = range.split("-").map((d) => parseInt(d))
  return Array.from(
    {
      length: end - start + 1,
    },
    (_, i) => start + i
  )
}
// Check if r1 is fully contained in r2
function isSubRange(r1, r2) {
  let lst1 = listFromRange(r1)
  let lst2 = listFromRange(r2)
  return (
    lst2.find((n) => n === lst1[0]) !== undefined &&
    lst2.find((n) => n === lst1[lst1.length - 1]) !== undefined
  )
}

// Check if a section of r1 is contained in r2
function isOverlappingRange(r1, r2) {
  let lst1 = listFromRange(r1)
  let lst2 = listFromRange(r2)
  return (
    lst2.find((n) => n === lst1[0]) !== undefined ||
    lst2.find((n) => n === lst1[lst1.length - 1]) !== undefined
  )
}

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  let pairs = lines.map((l) => l.split(","))
  let fullyOverlappingPairs = pairs.filter(
    ([r1, r2]) => isSubRange(r1, r2) || isSubRange(r2, r1)
  )
  let partiallyOverlappingPairs = pairs.filter(
    ([r1, r2]) => isOverlappingRange(r1, r2) || isOverlappingRange(r2, r1)
  )
})
