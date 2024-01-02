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
      else recordDiffs[i].unshift(recordDiffs[i][0] - recordDiffs[i+1][0])
    }
    return acc + recordDiffs[0][0]
  }, 0)
  
  console.log(`result: ${result}`)
})
