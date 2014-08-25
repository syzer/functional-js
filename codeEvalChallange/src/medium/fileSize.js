/**
 * Created by syzer on 8/25/2014.
 */

function getFilesizeInBytes(filename) {
    return require('fs').statSync(filename).size;
}

module.exports.run = getFilesizeInBytes;
