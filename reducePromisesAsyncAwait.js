#!/usr/bin/env node

// nvm use 7
// node --harmony reducePromisesAsyncAwait.js

const url = require('url')
const request = require('http.min')

const hasLinux = version => version.files.includes('linux-x64')

main()

async function main() {
    try {
        let options = url.parse('http://nodejs.org/dist/index.json')
        let index = await request.json(options)
        let versions = index.filter(hasLinux).map(o => o.version)
        for (let version of versions) {
            let url = `https://nodejs.org/dist/${version}/node-${version}-linux-x64.tar.gz`
            console.log(`Downloading ${url}`)
            let download = await request(url)
            console.log(`Downloaded ${version}`)
        }
    } catch (err) {
        console.error(err)
    }
}

