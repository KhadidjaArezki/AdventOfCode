fs = require("fs")

function getNumsDigitIndices(numsRow) {
  return numsRow.map(({ index, number, length }) => {
    let numDigitIndices = []
    for (let j = 0; j < length; j++) {
      numDigitIndices.push( index + j)
    }
    return { number, 
      index,
      indices: numDigitIndices
    }
  })
}

function getRowTouchingNum(rowNums, i) {
  return rowNums.find(({ _, indices }) => indices.includes(i))
}
  
function getAllTouchingNums(asteriskIndices, rowNums) {
  return asteriskIndices
    .reduce((agg, ai) => {
      const numObj = getRowTouchingNum(rowNums, ai)
      if (numObj !== undefined && agg.every(no => no.index !== numObj.index)) {
        agg.push(numObj)
      }
      return agg
    }, [])
    .map(no => no.number)
}

fs.readFile("./input.txt", (e, data) => {
  const asterisks = []
  const numbers = []

  const lines = data.toString().split(/\n/)
  lines.forEach(line => {
    const asteriskMatch = [...line.matchAll(/(\*)/g)]
    if (asteriskMatch.length == 0) asterisks.push([])
    else asterisks.push(asteriskMatch.map(o => o.index))
  
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

  const gearRatioSum = asterisks.reduce((acc, rowAsterisks, i) => {
    let rowGearRatioSum = rowAsterisks.reduce((rowAcc, asteriskIndex) => {
      let touchingPartNums = []
      const currRowNums = getNumsDigitIndices(numbers[i])
      const upperRowNums = getNumsDigitIndices(numbers[i-1] || [])
      const lowerRowNums = getNumsDigitIndices(numbers[i+1] || [])
      touchingPartNums.push(...getAllTouchingNums([asteriskIndex-1, asteriskIndex+1], currRowNums))
      touchingPartNums.push(...getAllTouchingNums([asteriskIndex, asteriskIndex-1, asteriskIndex+1], upperRowNums))
      touchingPartNums.push(...getAllTouchingNums([asteriskIndex, asteriskIndex-1, asteriskIndex+1], lowerRowNums))
      
      return touchingPartNums.length == 2
      ? rowAcc + touchingPartNums[0] * touchingPartNums[1]
      : rowAcc
    }, 0)
    return acc + rowGearRatioSum
  }, 0)
  console.log(gearRatioSum)
})
