const jsonfile = require('jsonfile');

function loadApproved() {
  return jsonfile.readFileSync('./approved.json', 'utf8');
}

module.exports = loadApproved
