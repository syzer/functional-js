const bluebird = require('bluebird')

async function wait2sec() {
  console.log('start')
  await bluebird.delay(2000)
  console.log('done')
}

wait2sec()