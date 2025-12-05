import * as fs from "fs"

/*
 * The joltage that the bank produces is equal to the number formed by
 * the digits on the batteries you've turned on.
 * Now, you need to make the largest joltage by turning on exactly
 * twelve batteries within each bank.
 * Find the largest possible joltage each bank can produce.
 * Search from the position after the last found max and leave out the last
 * positions that are to be filled in the next iterations
 * */

function sum(...arr: number[]) {
  return arr.reduce((acc, num) => {
    return acc + num
  }, 0)
}

fs.readFile("./input.txt", (e, data) => {
  let banks = data.toString().trimEnd().split(/\n/)
  const NUM_BATTERIES = 12
  const maxJolts: number[] = []
  banks.forEach((bank) => {
    let maxJolt = '1'.repeat(NUM_BATTERIES)
    let lastMaxPos = 0
    for (let i = 0; i < NUM_BATTERIES; i++) {
      let currMaxPos = 0
      let currMaxRating = 0
      // console.log(bank.slice(lastMaxPos, bank.length - NUM_BATTERIES + i + 1))
      for (let j = lastMaxPos; j < bank.length - NUM_BATTERIES + i + 1; j++) {
        if (parseInt(bank[j]) > currMaxRating) {
          currMaxRating = parseInt(bank[j])
          currMaxPos = j
        }
      }
      maxJolt = maxJolt.substring(0, i) + currMaxRating.toString() + maxJolt.substring(i + 1, maxJolt.length)
      lastMaxPos = currMaxPos + 1
    }
    maxJolts.push(parseInt(maxJolt))
  })
  console.log(sum(...maxJolts))
})
