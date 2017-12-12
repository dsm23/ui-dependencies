const jsonfile = require('jsonfile');

function saveRequest(json) {
  jsonfile.writeFileSync('./requested.json', json, {spaces: 2});
}

module.exports = saveRequest;
