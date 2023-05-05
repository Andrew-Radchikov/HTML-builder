
let fs = require('fs');
const path = require('path');
const mainPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.stat(copyPath, function(err) {
    if (!err) {
              
 listObjects(copyPath);
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

    }
    else if (err.code === 'ENOENT') {
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
        
    }
});



function listObjects(direct){
    let fs2 = require('fs');
    fs2.readdir(direct, (err, files) => {
       for (let file of files){
        let dirTR = path.join(copyPath, file);
        fs2.unlink(dirTR, err => {   });
       }
    });
 }








