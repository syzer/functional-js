#!/usr/bin/env node

// https://www.youtube.com/watch?v=AFhmbpGaFr0

const url = require('url')
const request = require('http.min')

let options = url.parse('http://nodejs.org/dist/index.json')


const hasLinux = version => version.files.includes('linux-x64')

// download in series
const download = versions =>
    versions.reduce((prom, version) =>
            prom.then(res => {
                let url = `https://nodejs.org/dist/${version}/node-${version}-linux-x64.tar.gz`
                console.log(`Downloading ${url}`)
                return request(url)
                    .then(() => console.log(`Downloaded ${version}`))
            })
        , Promise.resolve())

request.json(options)
    .then(res => res.filter(hasLinux))
    .then(objs => objs.map(o => o.version))
    .then(download)
    .catch(console.error)

