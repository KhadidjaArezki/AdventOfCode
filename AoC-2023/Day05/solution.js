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
  /*
  const soil2FertilizerMap = lines.substring(s2fIdx, lines.indexOf("\n\n", s2fIdx))
  .match(/(\d+)/g)
  const f2wIdx = lines.indexOf("fertilizer-to-water map:")
  const fertilizer2WaterMap = lines.substring(f2wIdx, lines.indexOf("\n\n", f2wIdx))
  .match(/(\d+)/g)
  const w2lIdx = lines.indexOf("water-to-light map:")
  const water2LightMap = lines.substring(w2lIdx, lines.indexOf("\n\n", w2lIdx))
  .match(/(\d+)/g)
  const l2tIdx = lines.indexOf("light-to-temperature map:")
  const light2TemperatureMap = lines.substring(l2tIdx, lines.indexOf("\n\n", l2tIdx))
  .match(/(\d+)/g)
  const t2hIdx = lines.indexOf("temperature-to-humidity map:")
  const temperature2HumidityMap = lines.substring(t2hIdx, lines.indexOf("\n\n", t2hIdx))
  .match(/(\d+)/g)
  const h2lIdx = lines.indexOf("humidity-to-location map:")
  const humidity2TemperatureMap = lines.substring(h2lIdx, lines.length)
  .match(/(\d+)/g)
  console.log(seed2SoilMap)
  */
})