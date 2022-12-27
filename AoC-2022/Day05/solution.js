fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  // State
  stacks = {}

  function getTaskInfo(task) {
    let taskInfo = task.match(/\d+/g)
    return taskInfo.map((d) => parseInt(d, 10))
  }

  function isCrate(crate) {
    return /\[[A-Z]\]/.test(crate)
  }

  // Side Effects
  function initializeStacks(row) {
    row.forEach((c, i) => {
      if (isCrate(c)) {
        if (stacks[i + 1] === undefined) stacks[i + 1] = []
        stacks[i + 1].push(c.substring(1, 2))
      }
    })
  }

  // Side Effects
  function moveCratesOneAtATime([cratesToMove, from, to]) {
    for (let i = 0; i < cratesToMove; i++) {
      let removedCrate = stacks[from].shift()
      stacks[to].unshift(removedCrate)
    }
  }

  function moveCratesAtOnce([cratesToMove, from, to]) {
    let removedCrates = stacks[from].splice(0, cratesToMove)
    return stacks[to].unshift(...removedCrates)
  }

  function getTopCrates() {
    let topCrates = ""
    for (let s in stacks) {
      let stack = stacks[s]
      topCrates = topCrates.concat(stack[0])
    }
    return topCrates
  }

  // Work Territory
  let [StartingStacks, rearrangementProcedure] = data.toString().split(/\n\n/)
  let procedureTasks = rearrangementProcedure.split("\n")
  let stackRows = StartingStacks.split("\n")
  stackRows.pop()
  let cratesPerRow = stackRows.map((r) =>
    r.match(/(?:(\s{3})\s)|(?:\[([A-Z])\]\s{0,1}?)+/gu)
  )
  cratesPerRow.forEach((row) => {
    initializeStacks(row)
  })

  // Part 01
  // procedureTasks.forEach((p) => {
  //   let taskInfo = getTaskInfo(p)
  //   moveCratesOneAtATime(taskInfo)
  // })

  // Part 02
  procedureTasks.forEach((p) => {
    let taskInfo = getTaskInfo(p)
    moveCratesAtOnce(taskInfo)
  })
  console.log(getTopCrates())
})
