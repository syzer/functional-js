const assert = require('assert').strict
const { read, countWords, countWordsNormal, errorMsg } = require('./k-compose')

// Test of read()
read('./readme.md').fork(
  err => {
    assert(err, /ENOENT: no such file or directory/)
  },
  result => {
    console.warn(result.value) // Either with text
  })


countWords('./readme.md').fork(
  err => {
    assert(err, /ENOENT: no such file or directory/)
  },
  result => {
    console.warn(result.value) // Either: value 22
  })


countWords('./readme.nonExistent').fork(
  err => {
    assert(err, /ENOENT: no such file or directory/)
    console.warn('No file')
  },
  result => {
    console.warn(result.value)
    assert(false)
  })

countWordsNormal('./empty.md').fork(
  console.error,
  result => {
    console.warn('Empty:', result.value, result) // Either: value undefined
    assert(result !== 3)
    assert(result.value !== 3)
    assert(result.value === null || result.value === errorMsg)
  }
)

countWordsNormal('./readme.md').fork(
  console.error,
  result => {
    console.warn('22?:', result.value) // Either: value 22
    assert(result.value === 22)
  }
)
