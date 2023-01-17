export function Node(x, y) {
  return {
    x,
    y,
    equals(node) {
      return this.x === node.x && this.y === node.y
    },
    calculateDistance(node) {
      return Math.sqrt(
        Math.pow(node.x - this.x, 2) + Math.pow(node.y - this.y, 2)
      )
    },
    toString() {
      return `(${this.x}, ${this.y})`
    },
    print() {
      console.log(this.toString())
    },
  }
}

export function Edge(src, dest) {
  return {
    src,
    dest,
    equals(edge) {
      return this.src.equals(edge.src) && this.dest.equals(edge.dest)
    },
    toString() {
      return `${src.toString()} -> ${dest.toString()}`
    },
    print() {
      console.log(this.toString())
    },
  }
}

export function DGraph() {
  return {
    edges: [],
    nodes: [],
    lastNode: null,
    addNode(node) {
      if (!this.hasNode(node)) this.nodes.push(node)
      this.setLastNode(this.nodes[this.nodes.length - 1])
    },
    hasNode(node) {
      return this.nodes.some((n) => n.equals(node))
    },
    getLastNode() {
      return this.lastNode
    },
    setLastNode(node) {
      this.lastNode = node
    },
    hasEdge(edge) {
      return this.edges.some((e) => e.equals(edge))
    },
    addEdge(edge) {
      if (!this.hasEdge(edge)) this.edges.push(edge)
    },
    print() {
      this.edges.forEach((e) => console.log(e.toString()))
    },
    length() {
      return this.nodes.length
    },
  }
}
