// Build a bundle for requesting the dependencies and sub dependencies of a package-lock that are not already marked as approved.

// - read package lock file from cli
// - flatten lock file
// - identify which dependencies are not already approved
// - build a package.json that can be used by snyk
const program = require("commander");

const loadPackage = require("../../util/loadPackage");
const createRequestFolder = require("../../util/createRequestFolder");
const createPackageForTest = require("../../util/createPackageForTest");
const linkLatest = require("../../util/linkLatest");

program.version("0.1.0").parse(process.argv);

const relPathToPackage = program.args[0];

const { requestId, requestPath } = createRequestFolder();
console.log("Generating request in " + requestPath);
const pkg = loadPackage(relPathToPackage);

createPackageForTest(null, pkg, requestPath);
linkLatest(requestId);
