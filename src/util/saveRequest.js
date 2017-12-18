const jsonfile = require('jsonfile');
const path = require('path');

const outputDependencies = require('./outputDependencies');

/**
 * Save reqested dependencies to a json and txt file
 * @param  {Object} dependencies requested dependencies
 * @param  {String} target       target directory
 */
function saveRequest(dependencies, target) {
  jsonfile.writeFileSync(path.join(target, './requested.json'), dependencies, {spaces: 2});
  // also save text version
  outputDependencies(Object.values(dependencies), target);
}

module.exports = saveRequest;
