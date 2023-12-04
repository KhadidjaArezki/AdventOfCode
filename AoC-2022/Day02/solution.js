fs = require("fs")

const ROCK = 1,
  PAPER = 2,
  SCISSORS = 3
const WIN = 6,
  DRAW = 3,
  LOSS = 0

function sum(arr) {
  return arr.reduce((agg, n) => agg + n, 0)
}

function zip(arr1, arr2) {
  if (arr1.length === 0 || arr1.length === 0) return []
  let [x, ...xs] = arr1
  let [y, ...ys] = arr2
  return [[x, y], ...zip(xs, ys)]
}

// Get your shape according to your oppenent's shape
function getYourShape(round) {
  if (round === "A X" || round === "B Z" || round === "C Y") return "C"
  if (round === "A Y" || round === "B X" || round === "C Z") return "A"
  if (round === "A Z" || round === "B Y" || round === "C X") return "B"
}

function getShapeScore(shape) {
  if (shape === "A") return ROCK
  if (shape === "B") return PAPER
  if (shape === "C") return SCISSORS
}

function getOutcomeScore(outcome) {
  if (outcome === "X") return LOSS
  if (outcome === "Y") return DRAW
  if (outcome === "Z") return WIN
}

function getRoundScore([shape_score, outcome_score]) {
  return shape_score + outcome_score
}

function getGameScore(roundScores) {
  return sum(roundScores)
}

fs.readFile("./input.txt", function (e, data) {
  let game = data.toString().split(/\n/gm)

  // Part 01
  // let gameOutcomeScores = game.map((r) => get_outcome_score(r))
  // let gameShapeScores = game.map((r) => get_shape_score(r.split(" ")[1]))
  // let roundScores = zip(gameShapeScores, gameOutcomeScores)
  // let sumOfRoundScores = roundScores.map((s) => sum(s))
  // let totalGameScore = sum(sumOfRoundScores)
  // console.log(totalGameScore)

  // Part 02
  let yourGameShapes = game.map((r) => getYourShape(r))
  let yourShapeScores = yourGameShapes.map((s) => getShapeScore(s))
  let yourOutcomeScores = game.map((r) => getOutcomeScore(r.split(" ")[1]))
  let newRoundScores = zip(yourShapeScores, yourOutcomeScores)
  let sumOfNewRoundScores = newRoundScores.map((s) => getRoundScore(s))
  let totalNewGameScore = getGameScore(sumOfNewRoundScores)
  console.log(totalNewGameScore)
})
