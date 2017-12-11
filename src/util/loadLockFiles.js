var fs = require('fs');

function loadLockFiles(path) {
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
}

module.exports = loadLockFiles;
