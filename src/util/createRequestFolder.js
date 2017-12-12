const fs = require('fs');
const path = require('path');

function getRequestFolder() {
  const dir = fs.mkdtempSync('request-');
  fs.mkdirSync(path.join(dir, 'tarballs'));
  return dir;
}

module.exports = getRequestFolder;
