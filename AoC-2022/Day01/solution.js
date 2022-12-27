fs = require("fs")

function sum(arr) {
  return arr.reduce((agg, n) => agg + n, 0)
}

function max(arr) {
  return arr.reduce((agg, n) => (n > agg ? n : agg))
}

// function merge(lst1, lst2) {
//   if (lst1.length === 0) return lst2
//   if (lst2.length === 0) return lst1
//   let [x, ...xs] = lst1
//   let [y, ...ys] = lst2
//   if (x <= y) return [x, ...merge(xs, [y, ...ys])]
//   else return [y, ...merge([x, ...xs], ys)]
// }

function splitAt(arr, n) {
  if (arr.length === 0) return [[], []]
  let [x, ...xs] = arr
  let [firstHalf, secondHalf] = splitAt(xs, n)
  if (x < n) return [[x, ...firstHalf], secondHalf]
  else return [firstHalf, [x, ...secondHalf]]
}

function quickSort(arr) {
  if (arr.length === 0) return []
  let [n, ...ns] = arr
  let [xs, ys] = splitAt(ns, n)
  return [...quickSort(xs), n, ...quickSort(ys)]
}

function reverseList(arr) {
  if (arr.length === 0) return []
  let [x, ...xs] = arr
  return [...reverseList(xs), x]
}

fs.readFile("./input.txt", function (e, data) {
  caloriesPerElf = data.toString().split(/\n^\n/gm)
  caloriesPerElf = caloriesPerElf
    .map((str) => str.split("\n"))
    .map((ss) => ss.map((s) => parseInt(s)))
  sumOfCaloriesPerElf = caloriesPerElf.map((ns) => sum(ns))

  // Part 01
  // let maxCalorieNumber = max(sumOfCaloriesPerElf)

  // Part 02
  let [fst, snd, trd, ..._] = reverseList(quickSort(sumOfCaloriesPerElf))
  let sumOfTopThreeCalories = sum([fst, snd, trd])
  console.log(sumOfTopThreeCalories)
  // console.log(caloriesPerElf.length) //249 elves
})
