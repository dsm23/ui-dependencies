const fs = require('fs');
const deleteFile = require('./deleteFile');

function outputDependencies(array) {
  var logger;
  var fileName = new Date().getTime() + '.new-dependencies.txt';
  // var fileName = `${fromCommit}-${toCommit}.new-dependencies.txt`;

  logger = fs.createWriteStream(fileName, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });

  array.forEach(function(dep) {
    logger.write(dep + '\n');
  });

  // all done, let's clean up
  deleteFile('previous.package-lock.json');
  deleteFile('current.package-lock.json');
}

module.exports = outputDependencies;
