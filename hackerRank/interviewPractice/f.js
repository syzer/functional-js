function f(input, state = 'f') {
  if (input) {
    return `${state}${input}`
  }
  return input => f(input, state + 'o')
}

// console.log(f()('l'))
console.log(f('l') === 'fl') // true
// console.log(f()('l'))
console.log(f()('l') === 'fol') // true
console.log(f()()('l') === 'fool') // true

// console.log(f()()()()('l')) // === 'foool'
console.log(f()()()()('l') === 'fooool')

console.log(f()()('t') === 'foot')
// && String(input) === input


// BONUS: stateless

var a = f()()
console.log(a('A') === 'fooA')
console.log(a()()()('B') === 'foooooB')
console.log(a()('C') === 'foooC')