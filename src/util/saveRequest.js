const jsonfile = require('jsonfile');
const path = require('path');

function saveRequest(json, target) {
  jsonfile.writeFileSync(path.join(target, './requested.json'), json, {spaces: 2});
}

module.exports = saveRequest;
