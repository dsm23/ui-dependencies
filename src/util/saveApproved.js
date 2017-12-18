const jsonfile = require('jsonfile');

function saveApproved(approved) {
  const sorted = Object.keys(approved).sort().reduce((acc, key) => Object.assign({}, acc, {
    [key]: approved[key]
  }), {});
  jsonfile.writeFileSync('./approved.json', sorted, {spaces: 2});
}

module.exports = saveApproved;
