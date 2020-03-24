var fs = require('fs');

fs.readFile('./data.json', 'utf-8', function (err, data) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data.toString());
})

console.log('end')