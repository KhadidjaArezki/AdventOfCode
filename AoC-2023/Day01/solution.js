fs = require("fs")

/**
 * Loop through lines and match digits
 * Extract first and last digit in each line
 * Store in array as a two-digit number
 * Add all numbers in array and return sum
 */

const digits = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
}
const digitsRegex = RegExp(`(\\d|${Object.keys(digits).join("|")})`, "g")

fs.readFile("./input.txt", (e, data) => {
  let lines = data.toString().split(/\n/)
  const calibrationValSum = lines.reduce((calibrationValues, line) => {
    const lineDigits = [...line.matchAll(digitsRegex)]
      .map(arr => arr[0])
      .map(digit => {
        if (digits.hasOwnProperty(digit)) return digits[digit]
        else return digit
      })
    const currCalibVal = `${lineDigits[0]}${lineDigits[lineDigits.length - 1]}`
    return calibrationValues + parseInt(currCalibVal)
  }, 0)
  console.log(calibrationValSum)
})
