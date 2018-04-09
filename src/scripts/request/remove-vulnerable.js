// If the top level dependencies and devDependencies resolve to versions that have already been imported, remove them from the request package json

// for each vulnerability in latest snyk-complete.json
//   for package vulnerability.from[1]
//     if package is in latest package.json, remove it
/* eslint-disable-next-line import/no-unresolved node/no-missing-require */

const report = require("../../../requests/latest/snyk-complete.json");
const pkg = require("../../../requests/latest/package.json");
const removeDependencies = require("../../util/removeDependencies");
const createPackageForTest = require("../../util/createPackageForTest");

const requestFolder = "./requests/latest";

const dependenciesToRemove = report.vulnerabilities.map(
  vulnerability => vulnerability.from[1]
);

pkg.dependencies = removeDependencies(pkg.dependencies, dependenciesToRemove);
pkg.devDependencies = removeDependencies(
  pkg.devDependencies,
  dependenciesToRemove
);

createPackageForTest(null, pkg, requestFolder);
