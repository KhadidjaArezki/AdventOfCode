import * as fs from "fs"

fs.readFile("./sinput.txt", (e, data) => {
  const rotations = data.toString().trimEnd().split(/\n/)
  // console.log(rotations.length)
  let currentDial = 50
  let password = 0
  rotations.forEach((rot) => {
    const [dir, num] = [rot[0], parseInt(rot.slice(1))]
    // console.log(dir, num)
    if (dir === 'L') {
      currentDial -= num
      while (currentDial < 0 || currentDial > 99) {
        if (currentDial < 0) {
          currentDial += 100
        }
        if (currentDial > 99) {
          currentDial -= 100
        }
      }
    } else {
      currentDial += num
      while (currentDial < 0 || currentDial > 99) {
        if (currentDial < 0) {
          currentDial += 100
        }
        if (currentDial > 99) {
          currentDial -= 100
        }
      }
    }
    if (currentDial === 0) {
      password += 1
    }
    // console.log('dial at: ', currentDial)
  })
  console.log(password)
})
