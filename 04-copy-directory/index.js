let fs = require('fs');
const path = require('path');
const mainPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');
fs.mkdir(copyPath, { recursive: true }, err => {
   if(err) throw err; 
   
});

fs.readdir(mainPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        let wayMainFile = path.join(mainPath, file.name);
        let wayCopyFile = path.join(copyPath, file.name);


        fs.copyFile(wayMainFile, wayCopyFile, err => {
                     if(err) throw err; 
                    
             });


    })


})
