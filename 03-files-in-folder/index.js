const path = require('path');

const wayToFolder = path.join(__dirname, 'secret-folder');

fs=require("fs");

fs.readdir(wayToFolder, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        let wayToFile = path.join(wayToFolder, file.name);
        fs.stat(wayToFile, (err, statistics) => {
            if(!statistics.isDirectory()){
                console.log(`${path.parse(wayToFile).name} - ${path.extname(wayToFile).slice(1)} - ${statistics.size}b`)
            }
        })
    });
})