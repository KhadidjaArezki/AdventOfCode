import { Node, Edge, DGraph } from "./DGraph.mjs"
import fs from "fs"

// We need to create a graph to simulate a rope knot's movement:
// Nodes represent positions visited by the knot while moving
// Edges represent knot path from previous to next position

// 2. For each step the head takes:
// - Determine the tail knots' next positions by calculating
//   their distance from the their leading knot
//   + if the difference between two successive
//     knots' x and y coordinates is zero, they are overlappling.
//   + if the difference is <= sqrt(2), they are either adjacent
//     or digonal to each other.
// - In such cases, tail does not move. else, for each tail knot:
//   create a new node, and a new edge, and add them to the knot's graph
// 3. After creating the graphs, get number of nodes in last tail graph

const MAX_ALLOWED_DISTANCE = Math.sqrt(2)
const MAX_COORDINATE_VALUE = Math.sqrt(Number.MAX_SAFE_INTEGER)

function getNewHeadCoordinates(head, d) {
  let newHeadX =
    d === "U" || d === "D" ? head.x : d === "R" ? head.x + 1 : head.x - 1

  let newHeadY =
    d === "L" || d === "R" ? head.y : d === "U" ? head.y + 1 : head.y - 1

  return [newHeadX, newHeadY]
}

function getNearestSpot(tail, newHead) {
  let nearestSpot = Node(MAX_COORDINATE_VALUE, MAX_COORDINATE_VALUE)
  let increments = [0, 1, -1]

  for (let i = 0; i < increments.length; i++) {
    for (let j = 0; j < increments.length; j++) {
      let newTailX = tail.x + increments[i]
      let newTailY = tail.y + increments[j]
      let newTail = Node(newTailX, newTailY)
      // Find the nearest spot to newHead before moving
      let distanceFromHead = newTail.calculateDistance(newHead)
      if (
        distanceFromHead <= MAX_ALLOWED_DISTANCE &&
        distanceFromHead < nearestSpot.calculateDistance(newHead)
      ) {
        nearestSpot = newTail
      }
    }
  }
  return nearestSpot
}

fs.readFile("./input.txt", (e, data) => {
  // let ropeKnots = ["H", "T"]
  let ropeKnots = ["H", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  // State
  let rope = {}
  ropeKnots.forEach((name) => {
    let knotGraph = DGraph()
    let knot = Node(0, 0)
    knotGraph.addNode(knot)
    rope[name] = knotGraph
  })

  let headGraph = rope["H"]
  let head = headGraph.getLastNode()

  let moves = data
    .toString()
    .split(/\n/)
    .map((l) => l.split(" "))

  moves.forEach(([d, s]) => {
    for (let _ = 0; _ < s; _++) {
      let [newHeadX, newHeadY] = getNewHeadCoordinates(head, d)
      let newHead = Node(newHeadX, newHeadY)

      // Side Effects
      headGraph.addNode(newHead)
      headGraph.addEdge(Edge(head, newHead))
      head = newHead
      headGraph.setLastNode(newHead)

      for (let k = 1; k < ropeKnots.length; k++) {
        let tailGraph = rope[ropeKnots[k]]
        let tail = tailGraph.getLastNode()
        let leadingKnot = rope[ropeKnots[k - 1]].getLastNode()

        // Only add new tail node if distance  > MAX_ALLOWED_DISTANCE
        if (tail.calculateDistance(leadingKnot) > MAX_ALLOWED_DISTANCE) {
          let nearestSpot = getNearestSpot(tail, leadingKnot)

          // Side Effects
          tailGraph.addNode(nearestSpot)
          tailGraph.addEdge(Edge(tail, nearestSpot))
          tail = nearestSpot
          tailGraph.setLastNode(tail)
        }
      }
    }
  })
  // let lasTail = rope["T"]
  let lasTail = rope["9"]
  const positionsVisitedAtLeastOnce = lasTail.length()
  console.log(positionsVisitedAtLeastOnce)
})
