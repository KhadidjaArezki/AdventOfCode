fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let cards = data.toString().split(/\n/)
  .map(line => {
    const cardId = parseInt(line.match(/(\d+):/)[1])
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
  .map(card => {
    return {
      id: card.id,
      wins: card.winningNums.reduce((acc, num) => {
        return (card.ownedNums.includes(num))
        ? acc + 1
        : acc
      }, 0)
    }
  })
  
  cards = cards.reduce((acc, card) => {
    let winIds = []
    for (let j = 1; j <= card.wins; j++) {
      winIds.push(
        cards.find(c => c.id == card.id + j).id)
    }
    acc.push({ id: card.id, winIds })
    return acc
  }, [])

  function getCardsWon(cs) {
    if (cs.length == 0) return 0
    return cs.reduce((acc, card) => {
      return acc + 
        card.winIds.length + 
        getCardsWon(
          card.winIds.map(id => 
            cards.find(c => c.id == id)))
    }, 0)
  }
  const totalCardsWon = cards.length + getCardsWon(cards)
  console.log(totalCardsWon)
})
