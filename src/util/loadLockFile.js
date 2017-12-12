const jsonfile = require('jsonfile');
const path = require('path');

function loadLockFile(modulePath) {
  return jsonfile.readFileSync(path.join(modulePath, 'package-lock.json'), 'utf8');
}

module.exports = loadLockFile;
