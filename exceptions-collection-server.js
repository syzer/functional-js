let http = require('http'),
    fs = require('fs')

fs.readFile('exceptions-collection-fuckit.js', (err, html) => {
    if (err) {
        throw err
    }
    http.createServer((request, response) => {
        response.writeHeader(200, {'Content-Type': 'text/html'})
        response.write(html)
        response.end()
    }).listen(1337)
})
console.log('Server running at http://127.0.0.1:1337/')
