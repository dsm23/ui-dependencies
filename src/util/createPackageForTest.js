const jsonfile = require('jsonfile');
const path = require('path');

function createPackageForTest(lock, package, requestFolder) {
  jsonfile.writeFileSync(path.join(requestFolder, './package-lock.json'), lock, {spaces: 2});
  jsonfile.writeFileSync(path.join(requestFolder, './package.json'), package, {spaces: 2});
}

module.exports = createPackageForTest;
