var fs = require('fs');

var lockFile;
var prevLockFile;

function loadLockFiles(callback) {
  // Load the JSON files
  fs.readFile('current.package-lock.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    try {
      lockFile = JSON.parse(data);
    } catch(e) {
      lockFile = { dependencies: [] };
    }
    if (prevLockFile) {
      callback(prevLockFile, lockFile);
    }
  });

  fs.readFile('previous.package-lock.json', 'utf8', function(err, data) {
    if (err) throw err;
    try {
      prevLockFile = JSON.parse(data);
    } catch(e) {
      prevLockFile = { dependencies: [] };
    }
    if (lockFile) {
      callback(prevLockFile, lockFile);
    }
  });
}

module.exports = loadLockFiles;
