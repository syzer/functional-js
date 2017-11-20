// coding quicky.. test 2
// https://www.pramp.com/challenge/15oxrQx6LjtQj9JK9XqA
const _ = require('lodash')

function getCheapestCost(rootNode) {
  if (_.isEmpty(rootNode.children)) {
    return rootNode
  }
  return getCheapestCost(rootNode.children)
}


/******************************************
 * Use the helper code below to implement *
 * and test your function above           *
 ******************************************/

// Constructor to create a new Node
function Node(cost) {
  this.cost = cost
  this.children = []
}

// test
const root = new Node(0)
const Node5 = new Node(5)
Node5.children = [new Node(4)]

const node3 = new Node(3)
const node2 = new Node(2)
const node1 = new Node(1)
node1.children = [new Node(1)]
node2.children = [node1]
const node0 = new Node(0)
node0.children = [new Node(10)]
node3.children = [node2, node0]

const node6 = new Node(6)
node6.children = [new Node(1), new Node(5)]
root.children = [ Node5, node3, node6]

console.log(JSON.stringify(root, null, 2))
console.log('result', getCheapestCost(root))