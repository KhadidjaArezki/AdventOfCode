fs = require("fs")

function createMap(partLines) {
  return partLines.map(line => {
    const [ dest, src, range ] = line.match(/(\d+)/g)
    return {
      destRange: {
        start: +dest,
        end: +dest + +range - 1 
      },
      srcRange: {
        start: +src,
        end: +src + +range - 1 
      },
      range: +src > +dest ? -range : +range
    }
  })
}

function getMapping(map, src) {
  return map.reduce((dest, map) => {
    if (src >= map.srcRange.start && +src <= map.srcRange.end) {
      return map.destRange.start + (src - map.srcRange.start)
    }
    else return dest
  }, null) || src
}

fs.readFile("./input.txt", (e, data) => {
  let parts = data.toString().split("\n\n")
  const seedIds = parts.shift()
  .match(/(\d+)/g)
  .map(n => parseInt(n))
  
  const maps = parts.map(part => createMap(part.split("\n").slice(1))) 
  
  const seeds = seedIds.map(seed => {
    let seedMapping = {
      seed,
      soil: getMapping(maps[0], seed)
    }
    seedMapping.fertilizer = getMapping(maps[1], seedMapping.soil)
    seedMapping.water = getMapping(maps[2], seedMapping.fertilizer)
    seedMapping.light = getMapping(maps[3], seedMapping.water)
    seedMapping.temperature = getMapping(maps[4], seedMapping.light)
    seedMapping.humidity = getMapping(maps[5], seedMapping.temperature)
    seedMapping.location = getMapping(maps[6], seedMapping.humidity)
    return seedMapping
  })
  
  const nearestLocation = seeds.reduce((min, seed) => {
    return seed.location < min
    ? seed.location
    : min
  }, Number.MAX_SAFE_INTEGER)
  console.log(nearestLocation)
})