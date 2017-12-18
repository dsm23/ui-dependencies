const jsonfile = require('jsonfile');

/**
 * Load the approved list of dependencies
 * @return {Object} Approved dependencies
 */
function loadApproved() {
  return jsonfile.readFileSync('./approved.json', 'utf8');
}

module.exports = loadApproved
