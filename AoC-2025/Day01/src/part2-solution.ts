import * as fs from "fs"

function divmod(a: number, b: number) {
  const divRes = a >= 0
  ? Math.floor(a/b)
  : Math.ceil(a/b)
  const modRes = ((a % b) + b) % b
  return [divRes, modRes]
}

fs.readFile("./input.txt", (e, data) => {
  const rotations = data.toString().trimEnd().split(/\n/)
  let currentDial = 50
  // console.log('Dial starts at 50')
  let password = 0
  rotations.forEach((rot) => {
    const [dir, num] = [rot[0], parseInt(rot.slice(1))]
    // console.log(dir, num)
    if (dir === 'L') {
      currentDial -= num
    } else {
      currentDial += num
    }
    // console.log('dial at: ', currentDial)
    if (currentDial === 0) {
      const [divRes, modRes] = divmod(currentDial, 100)
      password += divRes + 1
      // console.log(`Dial hit zero ${divRes+1} times in this rotation`)
      currentDial = modRes
    }
    else if (currentDial > 0) {
      const [divRes, modRes] = divmod(currentDial, 100)
      password += divRes
      // console.log(`Dial hit zero ${divRes} times in this rotation`)
      currentDial = modRes
    } else {
      if (currentDial >= -99) { // between -1 and -99
        if (divmod(currentDial+100+num, 100)[1] !== 0) {
          password += 1
          // console.log(`Dial hit zero once in this rotation`)
        } else {
          // console.log(`Dial did not hit zero in this rotation`)
        }
        currentDial += 100
      } else {                  // smaller than -99
        const [divRes, modRes] = divmod(currentDial, 100)
        if (divmod(currentDial+100+num, 100)[1] === 0) {
          // console.log(`Dial hit zero ${Math.abs(divRes)} times in this rotation`)
          password += Math.abs(divRes)
        }
        else  {
          // console.log(`Dial hit zero ${Math.abs(divRes) + 1} times in this rotation`)
          password += Math.abs(divRes) + 1
        }
        currentDial = modRes
      }
    }
    // console.log('dial at end of rotation: ', currentDial)
  })
  console.log(password)
})
