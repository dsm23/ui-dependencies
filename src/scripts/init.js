// Creates an approved list from a package lock
// Should only need to run this once, when setting up from an already approved lock file

// 1. read package lock file from cli
// 2. flatten lock file
// 3. load approved list if already exists
// 4. add all contents of package lock to approved list

const program = require("commander");

const loadLockFile = require("../util/loadLockFile");
const flattenDependencies = require("../util/flattenDependencies");
const loadApproved = require("../util/loadApproved");
const saveApproved = require("../util/saveApproved");

program.version("0.1.0").parse(process.argv);

const relPathToLock = program.args[0];

const fileContents = loadLockFile(relPathToLock);
const flattened = flattenDependencies({}, fileContents);

const approved = loadApproved();
const updatedApproved = Object.assign({}, approved, flattened);
saveApproved(updatedApproved);

console.log("done");
