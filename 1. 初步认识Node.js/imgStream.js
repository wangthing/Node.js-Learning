var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'image/png'});
    fs.createReadStream('../images/222.jpg').pipe(res);

}).listen(3000)

console.log("running on localhost:3000");