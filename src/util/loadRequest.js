const jsonfile = require('jsonfile');
const path = require('path');

/**
 * Load requested dependencies from a given request path
 * @param  {String} relPathToRequest  path to a previous request
 * @return {Object}                   requested dependencies
 */
function loadRequest(relPathToRequest) {
  return jsonfile.readFileSync(path.join(relPathToRequest, './requested.json'), 'utf8');
}

module.exports = loadRequest
