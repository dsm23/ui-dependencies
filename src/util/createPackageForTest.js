const jsonfile = require('jsonfile');
const path = require('path');

function createPackageForTest(requested, requestFolder) {
    jsonfile.writeFileSync(path.join(requestFolder, './package.json'), {
      dependencies: requested
    }, {spaces: 2});
}

module.exports = createPackageForTest;
