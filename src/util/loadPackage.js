const jsonfile = require('jsonfile');
const path = require('path');

/**
 * Load a pakage from a given module path
 * @param  {String} modulePath path to module
 * @return {Object}            package contents
 */
function loadPackage(modulePath) {
  return jsonfile.readFileSync(path.join(modulePath, 'package.json'), 'utf8');
}

module.exports = loadPackage;
