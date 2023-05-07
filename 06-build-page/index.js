let fs = require('fs');
const access = require('fs');
const constants = require('fs/promises');
const path = require('path');
let wayToProject = path.join(__dirname, "project-dist");
let wayToAssets = path.join(__dirname, "assets");
let wayToCopyAssets=path.join(wayToProject, "assets");

async function createProject() {

    //Create folders

    await fs.promises.rm(wayToProject, {recursive: true, force: true});
    await fs.promises.mkdir(wayToCopyAssets, {recursive: true});

    // Copy directory

    async function copyDirectory(copyDir, pastDir){
        await fs.promises.rm(pastDir, {recursive: true, force: true});
        await fs.promises.mkdir(pastDir, {recursive: true});

        fs.promises.readdir(copyDir,{withFileTypes: true}).then (files=>{
            files.forEach(file=>{
                if(file.isFile()){
                    let from=path.join(copyDir, file.name);
                    let to=path.join(pastDir, file.name);
                    fs.promises.copyFile(from, to);
                }
                else if(file.isDirectory()){
                    let from=path.join(copyDir, file.name);
                    let to=path.join(pastDir, file.name);
                    fs.promises.mkdir(to, {recursive: true});
                    copyDirectory(from, to);
                }
            })
        })
    }

    copyDirectory(wayToAssets, wayToCopyAssets);
  
    // Inserting Templates

    let wayToComponents = path.join(__dirname, "components");
    let templates=await fs.promises.readdir(wayToComponents);
    let wayToHTML=path.join(__dirname, "template.html");
    let code=await fs.promises.readFile(wayToHTML, 'utf-8');
    let wayToIndex=path.join(wayToProject, "index.html");
   
    
    for (let file of templates) {
      let partOfCode = await fs.promises.readFile(path.join(wayToComponents, file));
      if (file.split(".")[1] === 'html'){
        code = code.replace(`{{${file.split(".")[0]}}}`, partOfCode.toString());
      }
    }
    await fs.promises.writeFile(wayToIndex, code);

    //Merge files
  
    let wayToStyles=path.join(__dirname, "styles");
    let wayToCSS=path.join(wayToProject, "style.css");
   
    const writeStream = fs.createWriteStream(wayToCSS, 'utf-8');
    const cssCodes = await fs.promises.readdir(wayToStyles, {withFileTypes: true});

    cssCodes.forEach(file=>{
        if (file.isFile() && path.parse(file.name).ext === '.css') {
            const readStream = fs.createReadStream(path.join(wayToStyles, file.name), 'utf-8');
            readStream.on('data', async code => {
                writeStream.write(code);
            });
        }
    })

  }

  
  createProject();