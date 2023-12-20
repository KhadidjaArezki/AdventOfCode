fs = require("fs")

fs.readFile("./small_input.txt", (e, data) => {
  let blocks = data.toString().split("\n\n")
  let seedRanges = blocks.shift()
  .match(/(\d+\s\d+)/g)
  .map(pair => {
    const [ start, length ] = pair.split(" ")
    return [ +start, (+start + +length - 1) ]
  })

  let sourceRanges = seedRanges

  blocks.forEach(block => {   
    const blockRanges = block.split("\n").slice(1).map(line => {
      const [ dest, src, length ] = line.split(/\s/)
      return [ +dest, +src, +length ]
    })
    let destinationRanges = []
    while (sourceRanges.length > 0) {
      const [ start, end ] = sourceRanges.pop()
      let isMappedRange = false
      for (let i = 0; i < blockRanges.length; i++) {
        const [ dest, src, length ] = blockRanges[i]
        /* Get the bounds of the intersection of the source range
         * to be mapped with the source in the current range in block.
         * E.g., intersection of 79-92 with 52 50 48 is 79-92
         */
        const overlapStart = Math.max(start, src)
        const overlapEnd = Math.min(end, src + length)
        if (overlapStart < overlapEnd) {
          /* intersection is non empty, and we have a mapping */
          isMappedRange = true
          /* (- src + dest) is the mapping that we apply to the intersection range to get destination ranges */
          destinationRanges.push([ (overlapStart - src + dest), (overlapEnd - src + dest) ])
          /* the range start-overlap_start is beyond the intersection and must be put back */
          if (overlapStart > start) sourceRanges.push([ start, overlapStart ])
          /* the range end-overlap_end is beyond the intersection and must be put back */
          if (end > overlapEnd) sourceRanges.push([ overlapEnd, end ])
          break
        }
      }
      /* if none of the ranges map, map source range to itself */
      if (!isMappedRange) destinationRanges.push([ start, end ])
    }
    sourceRanges = destinationRanges
  })

  const nearestLocation = sourceRanges.map(range => range[0]).reduce((min, locationRangeStart) => {
    if (locationRangeStart < min) return locationRangeStart
    else return min
  }, Number.MAX_SAFE_INTEGER)
  console.log(nearestLocation)
})

