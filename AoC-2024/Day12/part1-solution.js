fs = require("fs")
const { ucc } = require("./ucc")

fs.readFile("./input.txt", (e, data) => {
  const lines = data.toString().split(/\n/)
	lines.pop()
  const regions = {}
  
  lines.forEach((line, j) => {
    let currIdx = 1
    prevPlot = line[0]
    if (!(prevPlot in regions)) regions[prevPlot] = []
    currRegionCoords = [parseInt(j), 0, 0]
    while (currIdx < line.length) {
      let currentPlot = line[currIdx]
      if (currentPlot == prevPlot) currRegionCoords[2] = parseInt(currIdx)
      else {
        regions[prevPlot].push(currRegionCoords)
        if (!(currentPlot in regions)) {
          regions[currentPlot] = []
        }
        currRegionCoords = [parseInt(j), parseInt(currIdx), parseInt(currIdx)]
      }
      prevPlot = currentPlot
      currIdx++
      if (currIdx == line.length) regions[prevPlot].push(currRegionCoords)
    }
  })

  // CONSTRUCT A GRAPH FOR EACH PLOT
  const graphs = {}
  for (const plot in regions) {
    graphs[plot] = {}
    for (let i=0; i<regions[plot].length; i++) {
      const plotRow = regions[plot][i]
      const [y, xStart, xEnd] = plotRow
      for (let k=xStart; k<=xEnd; k++) {
        const currNode = `${y},${k}`
        graphs[plot][currNode] = []
      }
    }
  }
	// Create adjacency lists for each graph
  for (const g in graphs) {
    const nodes = graphs[g]
    for (const node in nodes) {
      const [y, x] = node.split(",").map(v => parseInt(v))
      if ((x-1 >= 0) && (`${y},${x-1}` in nodes))               graphs[g][node].push(`${y},${x-1}`)
      if ((x+1 < lines[0].length) && (`${y},${x+1}` in nodes))  graphs[g][node].push(`${y},${x+1}`)
      if ((y-1 >= 0) && (`${y-1},${x}` in nodes))               graphs[g][node].push(`${y-1},${x}`)
      if ((y+1 < lines.length) && (`${y+1},${x}` in nodes))     graphs[g][node].push(`${y+1},${x}`)
    }
  }
	let fencePrices = 0
  // IDENTIFY CONNECTED COMPONENTS IN EACH GRAPH
	for (const g in graphs) {
	  const cc = ucc(graphs[g])
		for (const c in cc) {
			const regionArea = cc[c].size
			let regionPerim = 0
      const nodes = cc[c]
			for (const node of nodes) {
				const [y, x] = node.split(",").map(v => parseInt(v))
        // Add fence side if and only if the node is on the side of the region
        if ((x-1 < 0) || !nodes.has(`${y},${x-1}`))                regionPerim+=1
        if ((x+1 >= lines[0].length) || !nodes.has(`${y},${x+1}`)) regionPerim+=1
        if ((y-1 < 0) || !nodes.has(`${y-1},${x}`))                regionPerim+=1
        if ((y+1 >= lines.length) || !nodes.has(`${y+1},${x}`))    regionPerim+=1
			}
			fencePrices += (regionArea * regionPerim)
		}
	}
	console.log(fencePrices)

})

