fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  const symbols = []
  const numbers = []

  const lines = data.toString().split(/\n/)
  lines.forEach(line => {
    const symbolMatch = [...line.matchAll(/([^\d\.])/g)]
    if (symbolMatch.length == 0) symbols.push([])
    else symbols.push(symbolMatch.map(o => o.index))
  
    const numberMatch = [...line.matchAll(/(\d+)/g)]
    if (numberMatch.length == 0)  numbers.push([])
    else numbers.push(numberMatch.map(obj => {
      return {
        index: obj.index,
        number: parseInt(obj[0]),
        length: obj[0].length
      }
    }))
  })
  
  const partNumbersSum = numbers.reduce((acc, numArr, i) => {
    let rowAcc = numArr.reduce((racc, numObj) => {
      const { index, number, length } = numObj
      const currRowSymbolIndicies = symbols[i]
      const upperRowSymbolIndicies = symbols[i-1] || []
      const lowerRowSymbolIndicies = symbols[i+1] || []
      let isPartNumber = false
      for (let j = 0; j < length; j++) {
        const digitIndex = index + j
        if (
        [digitIndex-1, digitIndex+1].some(ni => currRowSymbolIndicies.includes(ni)) ||
        [digitIndex, digitIndex-1, digitIndex+1].some(ni => upperRowSymbolIndicies.includes(ni)) ||
        [digitIndex, digitIndex-1, digitIndex+1].some(ni => lowerRowSymbolIndicies.includes(ni))
        ) {
          isPartNumber = true
        }
      }
      return isPartNumber
      ? racc + number
      : racc
    }, 0)
    return acc + rowAcc
  }, 0)
  console.log(partNumbersSum)
})
