// Build a bundle for requesting the dependencies and sub dependencies of a package-lock that are not already marked as approved.

// - read package lock file from cli
// - flatten lock file
// - identify which dependencies are not already approved
// - build a package.json that can be used by snyk
// - generate a snyk report
// - remove any warnings from snyk report
const program = require('commander');
const path = require('path');

const loadLockFile = require('../util/loadLockFile');
const loadPackage = require('../util/loadPackage');
const flattenDependencies = require('../util/flattenDependencies');
const loadApproved = require('../util/loadApproved');
const saveRequest = require('../util/saveRequest');
const getRequested = require('../util/getRequested');
const createRequestFolder = require('../util/createRequestFolder');
const createPackageForTest = require('../util/createPackageForTest');
const slurp = require('../util/slurp');
const npmInstall = require('../util/npmInstall');
const snykTest = require('../util/snykTest');
const snykToHtml = require('../util/snykToHtml');

program
  .version('0.1.0')
  .parse(process.argv);

const relPathToPackage = program.args[0];

const requestFolder = createRequestFolder();
console.log('Generating request in ' + requestFolder);
const lock = loadLockFile(relPathToPackage);
const package = loadPackage(relPathToPackage);
const dependencies = flattenDependencies({}, lock);
const approved = loadApproved();
const requested = getRequested(dependencies, approved);
createPackageForTest(lock, package, requestFolder);
saveRequest(requested, requestFolder);
npmInstall(requestFolder);
snykTest(requestFolder, 'results.json');
snykToHtml(requestFolder, 'results.json');

console.log(`Saving tarballs to: ${requestFolder}...`);

slurp(requested, path.join(requestFolder, 'tarballs')).then(() => {
  console.log('...done');
});
