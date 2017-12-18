const jsonfile = require('jsonfile');
const path = require('path');

function loadRequest(relPathToRequest) {
  return jsonfile.readFileSync(path.join(relPathToRequest, './requested.json'), 'utf8');
}

module.exports = loadRequest
