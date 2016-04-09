#!/usr/bin/env node

// ./countingSheepExec.js < input_file.txt > output_file.txt

'use strict'

const run = require('./countingSheep')

const processStream = (inStream) => {
    const readline = require('readline'),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    // skip first line
    let i = 0
    rl.on('line', line => {
        if (!i) return i++
        console.log(`Case #1: ${run(line)}`)
    })
}

processStream(process.stdin)