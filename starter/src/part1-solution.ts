import * as fs from "fs"

fs.readFile("./sinput.txt", (e, data) => {
  let lines = data.toString().trimEnd().split(/\n/)
  console.log(lines)
})
