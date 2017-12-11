var fs = require('fs');
var compareLocks = require('./compareLocks');

var lockFile;
var prevLockFile;

function loadLockFiles() {
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
      compareLocks(prevLockFile, lockFile);
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
      compareLocks(prevLockFile, lockFile);
    }
  });
}

module.exports = loadLockFiles;
