
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








// function copyDir(dir,name1, name2){
//     let fs = require('fs');
//     const path = require('path');
//     const mainPath = path.join(__dirname, name1);
//     const copyPath = path.join(__dirname, name2);
//     fs.mkdir(copyPath, { recursive: true }, err => {
//        if(err) throw err; 
       
//     });
//     fs.readdir(mainPath, {withFileTypes: true}, (err, files) => {
//         files.forEach(file => {
//             let wayToFile = path.join(mainPath, file.name);
//             fs.stat(wayToFile, (err, statistics) => {
//                 if(!statistics.isDirectory()){
//                     let wayMainFile = path.join(mainPath, file.name);
//                     let wayCopyFile = path.join(copyPath, file.name);
//                     fs.copyFile(wayMainFile, wayCopyFile, err => {
//                         if(err) throw err; 
//                     });
//                 }
//                 else{
//                     console.log(file);
//                     // copyDir(path.join(__dirname, name1),file.name,file.name);
//                 }
//             })
           
    
    
//         })
    
    
//     })
    

// }


// copyDir(__dirname,'files', 'files-copy' );