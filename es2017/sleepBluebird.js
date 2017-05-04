const bluebird = require('bluebird')

async function wait2sec() {
  console.log('start')
  await bluebird.delay(2000)
  console.log('done')
}

// wait2sec()

async function iterate() {
  for (let i of [1,2,3]) {
    await wait2sec()
  }
}

iterate()
