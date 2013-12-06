var xml2js = require('xml2js'),
    fs = require('fs'),
    path = require('path'),
    name = 'x2js',
    optimist = require('optimist'),
    argv = optimist
      .options('help',
        {alias:'h', describe: 'Show help'})
      .options('indents',
        {alias:'i', 
         describe: "Indents. Num of spaces",
         default: 2})
      .options('encoding',
        {alias:'e',
         describe: 'encoding if using stdin',
         default:'utf8'})
      .options('noroot',
        {alias:'n',describe: 'strip root elem in output'})
      .usage('Reads xml and writes to standard output.\nUsage : ' +
        name + ' [--help] [--noroot] FILE|-')
      .argv,
    fileParam = argv._[0],
    parser = new xml2js.Parser(),
    filePath;

if ( !fileParam || argv.help ){
  optimist.showHelp();
  process.exit(0);
}

parser.addListener('end', function(result) {
  console.log( JSON.stringify(result,null,2));
});


if ( fileParam === '-' ){
  // stdin
  process.stdin.resume();
  process.stdin.setEncoding(argv.encoding);
  xmlBuf="";
  process.stdin.on('data', function (chunk) {
    xmlBuf = xmlBuf + chunk;
  });
  process.stdin.on('end',function(){
    parser.parseString(xmlBuf);
  });
} else {
  filePath = path.resolve(__dirname,fileParam);
  fs.readFile(filePath, function(err, data) {
    parser.parseString(data);
  });
}


