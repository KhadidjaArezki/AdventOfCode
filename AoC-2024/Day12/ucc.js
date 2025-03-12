function ucc(ug) {
	const  explored = {}
  for (const node in ug) {
    explored[node] = false
  }
  let num_cc = 0
  const cc = {}
  for(const node in ug) {
    if (!explored[node]) {
      cc[num_cc] = new Set() 
      const q = []
      q.push(node)
      while (q.length > 0) {
        const v = q.pop()
        cc[num_cc].add(v)
        for (const w of ug[v]) {
          if (!explored[w]) {
            explored[w] = true
            q.push(w)
					}
				}
			}
			num_cc+=1
		}
	}
  return cc
}
module.exports = { ucc }
