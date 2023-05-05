let fs = require('fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('node:readline');

// const filename = path.resolve(__dirname, 'text.txt');
// let stream=new fs.ReadStream(filename, 'utf8');

const filename = path.resolve(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filename, { encoding: 'utf-8'});



let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your text, please\n>'
});
rl.prompt();
rl.on('line', (input) => {
    if(input == "exit"){
        rl.close();
    }
    else{
        writeStream.write(input);
    }
});

rl.on('close',()=>{
    console.log("Exit, Bye!")
})
