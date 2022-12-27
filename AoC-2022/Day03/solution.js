fs = require("fs")

const LOWERCASE_ASCII_CODE_OFFSET = 96,
  UPPERCASE_ASCII_CODE_OFFSET = 38

function sum(arr) {
  return arr.reduce((agg, n) => agg + n, 0)
}

function getRuckSackCompartements(rucksack) {
  return [
    rucksack.substring(0, rucksack.length / 2),
    rucksack.substring(rucksack.length / 2, rucksack.length),
  ]
}

function findDuplicate(zs, ys) {
  if (zs.length === 0) return undefined
  let [x, ...xs] = zs
  if (ys.find((y) => y === x) !== undefined) return x
  else return findDuplicate(xs, ys)
}

function findBadge(vs, ys, zs) {
  if (vs.length === 0) return undefined
  let [x, ...xs] = vs
  if (
    ys.find((y) => y === x) !== undefined &&
    zs.find((z) => z === x) !== undefined
  )
    return x
  else return findBadge(xs, ys, zs)
}

function getDuplicatedType([c1, c2]) {
  let xs = c1.split("")
  let ys = c2.split("")
  return findDuplicate(xs, ys)
}

function getBadge([c1, c2, c3]) {
  let xs = c1.split("")
  let ys = c2.split("")
  let zs = c3.split("")
  return findBadge(xs, ys, zs)
}

function isLowerChar(char) {
  return /^[a-z]$/.test(char)
}

function isUpperChar(char) {
  return /^[A-Z]$/.test(char)
}

function getTypePriority(type) {
  if (isLowerChar(type)) return type.charCodeAt(0) - LOWERCASE_ASCII_CODE_OFFSET
  if (isUpperChar(type)) return type.charCodeAt(0) - UPPERCASE_ASCII_CODE_OFFSET
}

fs.readFile("./input.txt", (e, data) => {
  // Part 01
  // let rucksacks = data.toString().split(/\n/gm)
  // let compartements = rucksacks.map((r) => getRuckSackCompartements(r))
  // let duplicatedTypes = compartements.map((p) => getDuplicatedType(p))
  // let duplicatedTypesPriorities = duplicatedTypes.map((t) => getTypePriority(t))
  // let sumOfDuplicatedTypesPriorities = sum(duplicatedTypesPriorities)
  // console.log(sumOfDuplicatedTypesPriorities)

  // Part 02
  let groups = data.toString().match(/^(.+?\n){3}/gm)
  let groupLists = groups.map((g) => g.split(/\n/))
  groupLists.forEach((g) => g.pop())
  let groupBadges = groupLists.map((g) => getBadge(g))
  let badgesPriorities = groupBadges.map((b) => getTypePriority(b))
  let sumOfBadgesPriorities = sum(badgesPriorities)
  console.log(sumOfBadgesPriorities)
})
