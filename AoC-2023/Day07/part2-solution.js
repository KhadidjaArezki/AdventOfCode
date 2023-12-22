fs = require("fs")
/**
 * get type of each hand
 * If types are different, sort by type. Card J can pretend to be 
 * whatever card would make the hand the strongest type possible.
 * else compare each card in both hands:
 *   sort by card label. J is just J and is not allowd to pretend.
 */
const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"]

function getHandLabelCount(hand) {
  let handLabelCount = [0, 0, 0, 0, 0]
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    if(card == hand[0]) handLabelCount[0]++
    else if (card == hand[1]) handLabelCount[1]++
    else if (card == hand[2]) handLabelCount[2]++
    else if (card == hand[3]) handLabelCount[3]++
    else handLabelCount[4]++
  }
  return handLabelCount
}
function isFiveOfKind(hand) {
  return getHandLabelCount(hand).some(count => count == 5)
}
function isFourOfKind(hand) {
  return getHandLabelCount(hand).some(count => count == 4)
}
function isFullHouse(hand) {
  const handLabelCount = getHandLabelCount(hand)
  return handLabelCount.some(count => count == 3) && handLabelCount.some(count => count == 2)
}
function isThreeOfKind(hand) {
  return getHandLabelCount(hand).some(count => count == 3)
}
function isTwoPair(hand) {
  const handLabelCount = getHandLabelCount(hand)
  return handLabelCount.reduce((acc, count) => {
    if(count == 2) acc++
    return acc
  }, 0) == 2
}
function isOnePair(hand) {
  const handLabelCount = getHandLabelCount(hand)
  const counts = handLabelCount.reduce((acc, count) => {
    if(count == 2) acc[0]++
    else if (count == 1) acc[1]++
    return acc
  }, [0, 0])
  return counts[0] == 1 && counts[1] == 3
}
function isHighCard(hand) {
  return getHandLabelCount(hand).every(count => count == 1)
}
function isStrongerHand(hand1, hand2) {
  return (isFiveOfKind(hand1) && !isFiveOfKind(hand2)) ||
   (isFourOfKind(hand1) && !isFiveOfKind(hand2) && !isFourOfKind(hand2)) ||
   (isFullHouse(hand1) && !isFiveOfKind(hand2) && !isFourOfKind(hand2) && !isFullHouse(hand2)) ||
   (isThreeOfKind(hand1) && (isTwoPair(hand2) || isOnePair(hand2) || isHighCard(hand2))) ||
   (isTwoPair(hand1) && (isOnePair(hand2) || isHighCard(hand2))) ||
   (isOnePair(hand1) && isHighCard(hand2))
}
function isStrongerCard(card1, card2) {
  return cards.indexOf(card1) < cards.indexOf(card2)
}
function applyWildCard(hand) {
  if (hand.indexOf("J") == -1) return hand
  const indexOfJ = hand.indexOf("J")
  const handLabelCount = getHandLabelCount(hand)

  if (isFiveOfKind(hand)) return "AAAAA"
  else if(isFourOfKind(hand) || isFullHouse(hand)) {
    const otherLetterIndex = hand.match(/([^J])/).index
    return hand.replace(/J/g, hand[otherLetterIndex])
  }
  else if (isThreeOfKind(hand)) {
    if (handLabelCount[indexOfJ] == 3) {
      const otherLetterIndex = hand.match(/([^J])/).index
      return hand.replace(/J/g, hand[otherLetterIndex])
    } else {
      const index = handLabelCount.findIndex(n => n == 3)
      return hand.replace("J", hand[index])
    }
  }
  else if (isTwoPair(hand)) {
    if (handLabelCount[indexOfJ] == 2) {
      const index = handLabelCount.findIndex((n, i) => n == 2 && hand[i] != "J")
      return hand.replace(/J/g, hand[index])
    }
    else {
      const index = handLabelCount.findIndex(n => n == 2)
      return hand.replace("J", hand[index])
    }
  }
  else if (isOnePair(hand)) {
    if (handLabelCount[indexOfJ] == 2) {
      const index = hand.match(/([^J])/).index
      return hand.replace(/J/g, hand[index])
    } else {
      const index = handLabelCount.findIndex(n => n == 2)
      return hand.replace("J", hand[index])
    }
  }
  else return hand.replace("J", "A")
}

fs.readFile("./input.txt", (e, data) => {
  let hands = data.toString()
  .split(/\n/)
  .map(line => line.split(/\s/))
  hands.sort(([ hand1, _ ], [ hand2, __ ]) => {
    let hand1Wild = applyWildCard(hand1)
    let hand2Wild = applyWildCard(hand2)
    if (isStrongerHand(hand1Wild, hand2Wild)) return 1
    else if (isStrongerHand(hand2Wild, hand1Wild)) return -1
    else {
      // loop through cards of both hands simultaneously and compare them 
      let secondOrderSortingValue = 0
      for (let i = 0; i < hand1.length; i++) {
        const card1 = hand1[i]
        const card2 = hand2[i]
        if (isStrongerCard(card1, card2)) {
          secondOrderSortingValue = 1
          break
        }
        else if (isStrongerCard(card2, card1)) {
          secondOrderSortingValue = -1
          break
        }
      }
      return secondOrderSortingValue
    }
  })
  const totalWinnigs = hands.reduce((winnigs, [_, bid], i) => {
    const rank = i + 1
    return winnigs + (bid * rank)
  }, 0)
  console.log(totalWinnigs)
})
