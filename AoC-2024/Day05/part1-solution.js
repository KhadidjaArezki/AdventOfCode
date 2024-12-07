fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  const [rules, updates] = data.toString().split(/\n\n/).map(b => b.split(/\n/))
  let ruleMap = {}
  let orderedUpdates = []
  
  rules.forEach(rule => {
    const [p1, p2] = rule.split("|")
    if (!ruleMap.hasOwnProperty(p1)) ruleMap[p1] = []
    ruleMap[p1].push(p2)
  })

  for (let k = 0; k < updates.length; k++) {
    const update = updates[k].split(",")
    let ordered = true
    
    for (let i = 0; i < update.length; i++) {
      let nextPages = update.slice(i+1)
      
      if (ruleMap.hasOwnProperty(update[i])) {
        if (!nextPages.every(p => ruleMap[update[i]].includes(p))) {
          ordered = false
          break
        }
        
        if (i > 0 &&
          update.slice(0, i).some(prev => ruleMap[update[i]].includes(prev))) {
            ordered = false
            break
        }
      }
    }
    if (ordered) orderedUpdates.push(update)
  }
console.log(orderedUpdates.reduce((acc, ou) => acc + parseInt(ou[parseInt(ou.length/2)]), 0))
})
