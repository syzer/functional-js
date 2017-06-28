// <p>Write a function that given as input an array of <u>Segments</u> (each one composed of 2 <u>Points</u>)&nbsp;, returns&nbsp;<strong>true</strong> if the segments can be connected to form a single connected graph (a graph is connected if any and all the points are reachable from any other point) , <strong>false</strong> otherwise.</p>
const input = [
  Segment(Point(1, 1), Point(2, 2)),
  Segment(Point(1, 1), Point(0, 0)),
  Segment(Point(2, 2), Point(2, 4)),
  Segment(Point(5, 5), Point(2, 4)),
]

const inputB = [
  Segment(Point(1, 1), Point(2, 2)),
  Segment(Point(2, 2), Point(2, 4)),
  Segment(Point(5, 5), Point(3, 3)),
]

const input1 = [
  [[1, 1], [2, 2]],
  [[2, 2], [1, 1]],
  [[3, 3], [2, 2]],
  [[3, 3], [1, 1]]
]

function Point(x, y) {
  if (this instanceof Point) {
    this.x = x
    this.y = y
  } else {
    return new Point(x, y)
  }
}

function Segment(p1, p2) {
  if (this instanceof Segment) {
    this.p1 = p1
    this.p2 = p2
  } else {
    return new Segment(p1, p2)
  }
}

// testGraph:: [Segment] -> Boolean
function testGraph(input) {
  const canConnect = (s, s2) =>
    Boolean(
      (s[0][0] === s2[0][0] && s[0][1] === s2[0][1])
      || (s[1][0] === s2[1][0] && s[1][1] === s2[1][1]))

  return !isNaN(input
    .map(s => {
      const p1 = s[0]
      const p2 = s[1]
      if (p1[0] < p2[0]) {
        return s
      } else {
        return [p2, p1]
      }
    })
    .sort((a, b) => a[0][0] - b[0][0])
    .reduce((s1, s2, i, arr) => {
      // console.log('connectable', canConnect(s1, s2))
      if (canConnect(s1, s2)) {
        return s2
      }
      else {
        // should short circuit
        return [[NaN, NaN], [NaN, NaN]]
      }
    })[0][0])
}

// false
const input3 = [
  [[1, 1], [2, 2]],
  [[2, 2], [2, 4]],
  [[5, 5], [4, 4]],
  [[4, 4], [3, 3]],
  [[5, 5], [3, 3]]
]

const input4 = [
  [[1, 1], [2, 2]],
  [[2, 2], [2, 4]],
  [[5, 5], [3, 3]]
]

console.log(testGraph(input))


// true
// [
// [[1, 1], [2, 2]],
//   [[1, 1], [0, 0]],
//   [[2, 2], [2, 4]],
//   [[5, 5], [2, 4]]
// ]

// false
//   [
//   [[1, 1], [2, 2]],
//     [[2, 2], [2, 4]],
//     [[5, 5], [3, 3]]
//   ]
