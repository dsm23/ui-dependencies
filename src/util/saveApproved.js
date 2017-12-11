const jsonfile = require('jsonfile');

function saveApproved(approved) {
  jsonfile.writeFileSync('./approved.json', approved, {spaces: 2});
}

module.exports = saveApproved;
