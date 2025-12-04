import * as fs from "fs"

/*
 * The joltage that the bank produces is equal to the number formed by
 * the digits on the batteries you've turned on. For example, if you
 * have a bank like 12345 and you turn on batteries 2 and 4, the
 * bank would produce 24 jolts. (You cannot rearrange batteries.)
 * Find the largest possible joltage each bank can produce.
 * */

function sum(...arr: number[]) {
  return arr.reduce((acc, num) => {
    return acc + num
  }, 0)
}

fs.readFile("./input.txt", (e, data) => {
  let banks = data.toString().trimEnd().split(/\n/)
  const maxJolts: number[] = []
  banks.forEach((bank) => {
    let fstMaxRating = 0
    let fstMaxRatingIndex = 0
    let maxJolt = 0
    for (let i = 0; i < bank.length; i++) {
      if (parseInt(bank[i]) > fstMaxRating) {
        fstMaxRating = parseInt(bank[i])
        fstMaxRatingIndex = i
      }
    }
    for (let i = 0; i < bank.length; i++) {
      if (i === fstMaxRatingIndex) continue
      // Find the rating that maximizes the joltage for this bank
      const jolt = i < fstMaxRatingIndex
        ? parseInt([parseInt(bank[i]), fstMaxRating].join(''))
        : parseInt([fstMaxRating, parseInt(bank[i])].join(''))
      if (jolt > maxJolt) {
        maxJolt = jolt
      }
    }
    maxJolts.push(maxJolt)
  })
  console.log(sum(...maxJolts))
})
