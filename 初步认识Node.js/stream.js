var fs = require('fs')
var stream = fs.createReadStream('./data.json');
var str = ''
stream.on('data', function (chunk) {
    console.log(chunk);
    console.log(str += chunk);
})

stream.on('end', function () {
    console.log("finished");
})