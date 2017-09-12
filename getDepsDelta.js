/*
eslint-disable
  no-var,
  func-names,
  no-use-before-define,
  dot-notation,
  prefer-destructuring
*/

var fs = require('fs');
var exec = require('child_process').exec;

var allowedFlags = ['fromCommit']; // unused
var _args = process.argv.slice(2); // unused
var args = {}; // unused
var lockFile;
var prevLockFile;
var fromCommit = 'HEAD~1';

// command line flag processing
if (_args.length > 0) {
  _args.forEach((arg) => {
    var key = arg.split('=')[0].replace('--', '');
    var value = arg.split('=')[1];
    if (allowedFlags.indexOf(key) > -1) {
      args[key] = value;
    } else {
      // eslint-disable-next-line no-console
      console.log('unknown flag passed. Ignoring.');
    }
  });
}

function loadLockFiles() {
  // Load the JSON files
  fs.readFile('package-lock.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    lockFile = JSON.parse(data);
    if (prevLockFile) {
      compareLocks(prevLockFile, lockFile);
    }
  });

  fs.readFile('previous.package-lock.json', 'utf8', function(err, data) {
    if (err) throw err;
    prevLockFile = JSON.parse(data);
    if (lockFile) {
      compareLocks(prevLockFile, lockFile);
    }
  });
}

// eslint-disable-next-line no-unused-vars
function getLock(error, stdout, stderr) {
  if (error) {
    throw new Error('error getting previous lockFile from git');
  }

  loadLockFiles();
}

// get the previous Lock

if (args.hasOwnProperty('fromCommit')) {
  fromCommit = args.fromCommit;
}

exec(
  // eslint-disable-next-line max-len
  'git show ' + fromCommit + ':./package-lock.json > ./previous.package-lock.json',
  getLock
);

function compareLocks() {
  var deps = lockFile.dependencies;
  var prevDeps = prevLockFile.dependencies;
  var newDependencies = [];
  var depKey;

  for (depKey in deps) {
    if (!prevDeps.hasOwnProperty(depKey) ||
          (prevDeps.hasOwnProperty(depKey) &&
          prevDeps[depKey].version !== deps[depKey].version) ) {
      newDependencies.push(deps[depKey].resolved);
    }
  }

  outputDependencies(newDependencies);
}

function deleteFile(path) {
  // eslint-disable-next-line consistent-return, no-unused-vars
  fs.stat(path, function(err, stats) {
    if (err) {
      // eslint-disable-next-line no-console
      return console.error(err);
    }

    fs.unlink(path, function(error) {
      if (error) {
        // eslint-disable-next-line no-console
        return console.log(error);
      }
      // eslint-disable-next-line no-console
      return console.log('file deleted successfully');
    });
  });
}

function outputDependencies(array) {
  var logger;
  var fileName = new Date().getTime() + '.new-dependencies.txt';

  logger = fs.createWriteStream(fileName, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });

  array.forEach(function(dep) {
    logger.write(dep + '\n');
  });

  // all done, let's clean up
  deleteFile('previous.package-lock.json');
}