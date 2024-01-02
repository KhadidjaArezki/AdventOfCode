fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  let valueRecords = data.toString().split(/\n/)
    .map(line => line.split(/\s/))

  const result = valueRecords.reduce((acc, vr) => {
    let lastRecordDiffs = vr.map(n => parseInt(n))
    let recordDiffs = [lastRecordDiffs]
    while(!lastRecordDiffs.every(n => n == 0)) {
      recordDiffs.push(lastRecordDiffs.reduce((agg, num, i) => {
        if (i < lastRecordDiffs.length-1)
        agg.push(lastRecordDiffs[i+1] - num)
        return agg
      }, []))
      lastRecordDiffs = recordDiffs[recordDiffs.length-1]
    }
    
    for(let i=recordDiffs.length-1; i>=0; i--) {
      if (recordDiffs[i].every(n => n == 0)) recordDiffs[i].push(0)
      else recordDiffs[i].push(recordDiffs[i][recordDiffs[i].length-1] + recordDiffs[i+1][recordDiffs[i+1].length-1])
    }
    return acc + recordDiffs[0][recordDiffs[0].length-1]
  }, 0)
  
  console.log(`result: ${result}`)
})
