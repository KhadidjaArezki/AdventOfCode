import { File, FNode } from "./FTree.mjs"
import fs from "fs"

function sum(arr) {
  return arr.reduce((agg, n) => agg + n, 0)
}
function getDirNameFromCommand(command) {
  return command.match(/(?:cd\s(.+))+/g).map((m) => m.substring(3, m.length))
}
function getDirNameFromOutput(output) {
  return /dir\s(.+)/.exec(output)[1]
}
function isDir(output) {
  return /dir\s(.+)/.test(output)
}
function isNot2DotCd(dirName) {
  return dirName !== ".."
}
function getDirContent(output) {
  return output.map((o) => {
    if (isDir(o)) return getDirNameFromOutput(o)
    else return getFileInfo(o)
  })
}
function getFileInfo(output) {
  return output.split(" ")
}
function addChildren(tree, contents) {
  return contents.forEach((c) => {
    if (Array.isArray(c)) {
      let [size, name] = c
      tree.addChild(File(name, tree, parseInt(size, 10)))
    } else tree.addChild(FNode(c, tree, []))
  })
}

/********************** Work Territory ******************************************
 Parsing terminal output:
 Output structure: cd+ ls <contents>. If <contents> contain dirs, cd into first
   - detect command lines by looking for a '$'
   - 'cd dir_name' command => retrieve object in tree with dir_name
   - 'cd ..' command => find parent tree object
   - ls command => get all lines up to the next command line '$'
   - output that starts with 'dir' => add child tree object to parent's children
   - output that starts with a number => add file object to parent's children
  
*********************************************************************************/

fs.readFile("./input.txt", (e, data) => {
  const MAX_SIZE = 100000
  const FILE_SYSTEM_SIZE = 70000000
  const REQUIRED_SPACE = 30000000

  // State
  let root = FNode("/", null, [])

  let output = data
    .toString()
    .match(/((\$.+\n)+)([^\$])+/g)
    .map((s) => s.split(/\$\sls\n/))
    .map((e) => e.map((s) => s.slice(0, -1)))

  let currentNode = root

  output.forEach(([cd, ls]) => {
    let dirNames = getDirNameFromCommand(cd)
    let contents = getDirContent(ls.split("\n"))

    dirNames.forEach((n) => {
      if (isNot2DotCd(n)) {
        if (n !== "/") {
          currentNode = currentNode.getChild(n)
        }
        addChildren(currentNode, contents)
      } else currentNode = currentNode.parent
    })
  })

  /** Part 01 ***/
  // let targets = []
  // root.traverse((tree) => {
  //   if (tree.type === "FNode" && tree.getSize() <= MAX_SIZE) {
  //     targets.push(tree)
  //   }
  // })

  // let targetSizes = targets.map((t) => t.getSize())
  // console.log(sum(targetSizes))

  /** Part 02 ***/
  const USED_SPACE = root.getSize()
  const FREE_SPACE = FILE_SYSTEM_SIZE - USED_SPACE
  const MIN_SPACE_TO_FREE = REQUIRED_SPACE - FREE_SPACE

  let targets = []
  root.traverse((tree) => {
    if (tree.type === "FNode" && tree.getSize() >= MIN_SPACE_TO_FREE) {
      targets.push(tree)
    }
  })
  let targetSizes = targets.map((t) => t.getSize())
  let smallestTarget = targetSizes.reduce((smallest, current) => {
    return current < smallest ? current : smallest
  })
  console.log(smallestTarget)
})
