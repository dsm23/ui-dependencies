const jsonfile = require('jsonfile');
const path = require('path');

function loadPackage(modulePath) {
  return jsonfile.readFileSync(path.join(modulePath, 'package.json'), 'utf8');
}

module.exports = loadPackage;
