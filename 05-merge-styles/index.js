let fs = require('fs');
const path = require('path');
const styleFile = path.join(__dirname, 'project-dist');
const copyPath = path.join(__dirname, 'styles');

const filename = path.resolve(styleFile , 'bundle.css');
const writeStream = fs.createWriteStream(filename, { encoding: 'utf-8'});

fs.readdir(copyPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        let wayToFile = path.join(copyPath, file.name);
        fs.stat(wayToFile, (err, statistics) => {
            if(!statistics.isDirectory() && path.extname(wayToFile).slice(1) == "css"){
               
                let stream=fs.ReadStream(wayToFile, 'utf8');
                stream.on('data', (chusk)=>{
                                                                    
                    writeStream.write(chusk+"\n");
                  });
                 
                  stream.on('end', function(){});
            }
        })
    });

    
})





