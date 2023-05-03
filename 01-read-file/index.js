
let fs = require('fs');
const path = require('node:path');


const filename = path.resolve(__dirname, 'text.txt');
let stream=new fs.ReadStream(filename, 'utf8');

stream.on('readable', function(){
    var symbol = stream.read();

    if (!symbol) {
      return;
    }
  
    symbol= "" + symbol;
  
    console.log(symbol);
  });
 
  stream.on('end', function(){});