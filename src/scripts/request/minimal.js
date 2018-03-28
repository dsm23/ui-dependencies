// If the top level dependencies and devDependencies resolve to versions that have already been imported, remove them from the request package json

/* eslint-disable-next-line import/no-unresolved node/no-missing-require */
const pkg = require("../../../requests/latest/package.json");

const requestFolder = "./requests/latest";
const npmInstall = require("../../util/npmInstall");
const loadApproved = require("../../util/loadApproved");
const minimalDependencies = require("../../util/minimalDependencies");
const createPackageForTest = require("../../util/createPackageForTest");

const approved = loadApproved();

npmInstall(requestFolder);

pkg.dependencies = minimalDependencies(
  requestFolder,
  pkg.dependencies,
  approved
);
pkg.devDependencies = minimalDependencies(
  requestFolder,
  pkg.devDependencies,
  approved
);

console.log(pkg);
createPackageForTest(null, pkg, requestFolder);
