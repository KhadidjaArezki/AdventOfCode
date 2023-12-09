fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let cards = data.toString().split(/\n/)
  .map(line => {
    const cardId = line.match(/(\d+):/)[1]
    return {
      id: cardId,
      winningNums: line.substring(line.indexOf(":"), line.indexOf("|"))
      .match(/\s{1,2}(\d+)/g)
      .map(n => parseInt(n)),
      ownedNums: line.substring(line.indexOf("|"), line.length)
      .match(/\s{1,2}(\d+)/g)
      .map(n => parseInt(n)),
    }
  })
  const points = cards.reduce((acc, card) => {
    const cardWinningNums = card.winningNums.filter(num => card.ownedNums.includes(num))
    return acc + (cardWinningNums.length == 0 || cardWinningNums.length == 1
    ? cardWinningNums.length
    : cardWinningNums.reduce((pdt, _, i) => i == 0 ? pdt : pdt*2, 1))
  }, 0)
  console.log(points)
})
