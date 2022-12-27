function getFileForPrint(file) {
  return {
    ...file,
    parent: file.parent.name,
  }
}
function printFile(file) {
  return JSON.stringify(getFileForPrint(file), null, 2)
}

function printFNode(tree) {
  function getTreeForPrint(tree) {
    return {
      ...tree,
      parent: tree.parent?.name || null,
      children: tree.map((child) => {
        if (child.children === undefined) return getFileForPrint(child)
        return getTreeForPrint(child)
      }),
    }
  }

  return JSON.stringify(getTreeForPrint(tree), null, 2)
}

// Assumptions about trees:
// 1. A tree's parent is assigned at creation
// 2. A tree's immediate children all have distinct names
// 3. getChild returns immediate child

export function File(name, parent, size) {
  return {
    name,
    type: "File",
    parent,
    size,
    getSize() {
      return this.size
    },
    print() {
      console.log(printFile(this))
    },
  }
}

export function FNode(name, parent, children) {
  return {
    name,
    type: "FNode",
    parent,
    children,
    forEach(f) {
      for (let i = 0; i < this.children.length; i++) {
        f(this.children[i], i)
      }
    },
    map(f) {
      let agg = []
      this.forEach((child) => {
        agg.push(f(child))
      })
      return agg
    },
    fold(f, acc) {
      this.forEach((child) => {
        acc = f(acc, child)
      })
      return acc
    },
    filter(p) {
      let agg = []
      this.forEach((child) => {
        if (p(child)) agg.push(child)
      })
      return agg
    },
    find(p) {
      result = {}
      this.forEach((child) => {
        if (p(child)) result = child
      })
      return result
    },
    traverse(f) {
      f(this)
      this.forEach((child) => {
        if (child.type === "FNode") {
          child.traverse(f)
        } else f(child)
      })
    },
    getChild(name) {
      let result = {}
      this.forEach((child) => {
        if (child.name === name) result = child
      })
      return result
    },
    getSize(initial = 0) {
      this.traverse((child) => {
        if (child.type === "File") initial += child.getSize()
      })
      return initial
    },
    // getSize(initial = 0) {
    //   return this.fold(function f(acc, child) {
    //     if (child.size !== undefined) return acc + child.getSize()
    //     return child.getSize(acc)
    //   }, initial)
    // },
    addChild(child) {
      this.children.push(child)
    },
    print() {
      console.log(printFNode(this))
    },
  }
}

// let root = FNode("/", null, [])
// let a = FNode("a", root, [])
// let b = FNode("b", root, [])
// let ee = FNode("e", a, [])
// let f = File("f", a, 29116)
// let i = File("i", ee, 567)
// let d = FNode("d", b, [])
// let j = File("j", b, 13809)
// let k = File("k", d, 6809)
// root.addChild(a)
// root.addChild(b)
// a.addChild(ee)
// a.addChild(f)
// ee.addChild(i)
// b.addChild(d)
// b.addChild(j)
// d.addChild(k)
