var xml2js = require('xml2js'),
    fs = require('fs'),
    path = require('path'),
    name = 'x2js',
    optimist = require('optimist'),
    argv = optimist
    .options('help',{alias:'h', describe: 'Show help'})
    .options('caproot',{alias:'c',describe:'no root elem in JSON (if just one)'})
    .usage('Reads xml input and writes to standard output.\nUsage : ' + name + ' [--help] [--caproot] FILE|-')
    .argv,
    fileParam = argv._[0],
    parser = new xml2js.Parser(),
    filePath;


    

if ( !fileParam || argv.help ){
  optimist.showHelp();
  process.exit(0);
}

parser.addListener('end', function(result) {
    console.dir(result);
    console.log('Done.');
});


if ( fileParam === '-' ){
  // stdin
} else {
  filePath = path.normalize(path.join(__dirname,fileParam));
  fs.readFile(filePath, function(err, data) {
    parser.parseString(data);
  });
}


