// nvm use 8
// http://exploringjs.com/es2016-es2017/ch_async-functions.html#_async-functions-are-started-synchronously-settled-asynchronously

const os = require('os')
const util = require('util')
const dns = require('dns')

const lookupAsync = util.promisify(dns.lookup)

async function getLocalIp() {
  const hn = os.hostname()
  const r = await lookupAsync(hn)
  console.log('Should log first: ', r)
  return r
}

console.log('Should log second: ', getLocalIp())


// const fetch = require('fetch')
const fetchUrl = require("fetch").fetchUrl
const fetch = util.promisify(fetchUrl)
const fetch2 = require('node-fetch')

async function fetchJson(url) {
  try {
    let request = await fetch2(url)
    let text = await request.text()
    return JSON.parse(text)
  }
  catch (error) {
    console.log(`ERROR: ${error.stack}`)
  }
}

const url = 'https://raw.githubusercontent.com/samayo/country-json/master/package.json'
fetchJson(url).then(console.log)

async function foo() {
  const [result1, result2] = await Promise.all([
    fetchJson(url),
    fetchJson(url),
  ])

  return [result1, result2]
}

foo().then(console.log)