// Build a bundle for requesting the dependencies and sub dependencies of a package-lock that are not already marked as approved.

// - read package lock file from cli
// - flatten lock file
// - identify which dependencies are not already approved
// - build a package.json that can be used by snyk
// - generate a snyk report
// - remove any warnings from snyk report
//
var program = require('commander');

const loadLockFiles = require('../util/loadLockFiles');
const flattenDependencies = require('../util/flattenDependencies');
const loadApproved = require('../util/loadApproved');
const saveRequest = require('../util/saveRequest');
const getRequested = require('../util/getRequested');


program
  .version('0.1.0')
  .parse(process.argv);

const relPathToLock = program.args[0];

const lock = loadLockFiles(relPathToLock);
const dependencies = flattenDependencies({}, lock);
const approved = loadApproved();
const requested = getRequested(dependencies, approved);

saveRequest(requested);
