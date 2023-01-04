// @ts-check
let fs = require("fs")

function countUntil(xs, p, init) {
  if (xs.length === 0) return init
  if (p(xs[0])) return 1 + init
  let [_, ...ys] = xs
  return countUntil(ys, p, init + 1)
}

fs.readFile("./input.txt", (e, data) => {
  // State
  let forest = []

  let lines = data.toString().split(/\n/)
  forest = lines.map((line) => line.split("").map((n) => parseInt(n)))

  function getLeftAndRightRows(row, index) {
    return [row.slice(0, index), row.slice(index + 1, row.length)]
  }
  function getTopAndBottomRows(forest, i, j) {
    return [
      forest.slice(0, i).map((rt) => rt[j]),
      forest.slice(i + 1, forest.length).map((rb) => rb[j]),
    ]
  }
  function countVisibleTrees(p) {
    return forest.reduce((acc, row, i) => {
      row.forEach((n, j) => {
        let [rowLeft, rowRight] = getLeftAndRightRows(row, j)
        if (p(rowLeft, rowRight, n)) acc++
        else {
          let [rowTop, rowBottom] = getTopAndBottomRows(forest, i, j)
          if (p(rowTop, rowBottom, n)) acc++
        }
      })
      return acc
    }, 0)
  }

  let visibleTreesCount = countVisibleTrees(function isVisibleTree(r1, r2, n) {
    return !r1.some((nl) => nl >= n) || !r2.some((nr) => nr >= n)
  })

  // Part 02
  function countScenicScores() {
    return forest.reduce((acc, row, i) => {
      row.forEach((n, j) => {
        let [rowLeft, rowRight] = getLeftAndRightRows(row, j)
        let [rowTop, rowBottom] = getTopAndBottomRows(forest, i, j)

        const p = (x) => x >= n
        const counter = (arr) => countUntil(arr, p, 0)
        let visibleTreesFromLeft = counter(rowLeft.reverse())
        let visibleTreesFromTop = counter(rowTop.reverse())
        let visibleTreesFromRight = counter(rowRight)
        let visibleTreesFromBottom = counter(rowBottom)
        acc.push(
          visibleTreesFromLeft *
            visibleTreesFromTop *
            visibleTreesFromRight *
            visibleTreesFromBottom
        )
      })
      return acc
    }, [])
  }

  let scenicScores = countScenicScores()
  let highestScenicScore = Math.max(...scenicScores)
})
