fs = require("fs")

fs.readFile("./input.txt", (e, data) => {
  const [rules, updates] = data.toString().split(/\n\n/).map(b => b.split(/\n/))
  let ruleMap = {}
  let unorderedUpdates = []
  
  rules.forEach(rule => {
    const [p1, p2] = rule.split("|")
    if (!ruleMap.hasOwnProperty(p1)) ruleMap[p1] = []
    ruleMap[p1].push(p2)
  })

  for (let k = 0; k < updates.length; k++) {
    const update = updates[k].split(",")
    
    for (let i = 0; i < update.length; i++) {
      const nextPages = update.slice(i+1)
      
      if (ruleMap.hasOwnProperty(update[i])) {
        if (!nextPages.every(p => ruleMap[update[i]].includes(p))) {
          unorderedUpdates.push(update)
          break
        }
        if (i > 0 &&
          update.slice(0, i).some(prev => ruleMap[update[i]].includes(prev))) {
            unorderedUpdates.push(update)
            break
        }
      }
    }
  }
  
  let orderedUous = []
  unorderedUpdates.forEach(uou => {
    let ordUou = Array(uou.length)
    let nonRuled = []

    for (let i = 0; i < uou.length; i++) {
      if (ruleMap.hasOwnProperty(uou[i])) {
        const nextCount = uou.reduce((acc, p) => {
          if (ruleMap[uou[i]].includes(p)) acc++
          return acc
        }, 0)
        ordUou[ordUou.length - nextCount - 1] = uou[i]
      } else nonRuled.push(uou[i])
    }
    let empty = null
    for (let j = 0; j < ordUou.length; j++) {
      if (ordUou[j] == undefined) { empty = j; break;}
    }
    
    if (empty != null) nonRuled.forEach(p => ordUou[empty] = p)
    orderedUous.push(ordUou)
  })
  console.log(orderedUous.reduce((acc, ou) => acc + parseInt(ou[parseInt(ou.length/2)]), 0))
  
})