fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  const MARKER_LENGTH = 14

  function isMarker(marker) {
    if (marker.length === 1) return true
    let [fst, tlMarker] = [marker[0], marker.substring(1, marker.length)]
    if (tlMarker.includes(fst)) return false
    else return isMarker(tlMarker)
  }

  // Work Territory
  let buffer = data.toString()

  for (let start = 0; start < buffer.length; start++) {
    let endOfMarker = start + MARKER_LENGTH
    let marker = buffer.substring(start, endOfMarker)
    if (isMarker(marker)) {
      console.log("ANSWER: ", endOfMarker)
      break
    }
  }
})
