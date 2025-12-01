import * as fs from "fs"

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  console.log(lines)
})
