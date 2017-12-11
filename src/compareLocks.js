const flattenDependencies = require('./flattenDependencies');
const outputDependencies = require('./outputDependencies');

function compareLocks(prevLockFile, lockFile) {
  const deps = flattenDependencies({}, lockFile.dependencies);
  const prevDeps = flattenDependencies({}, prevLockFile.dependencies);
  const newDependencies = [];

  for (let depKey in deps) {
    if (!prevDeps.hasOwnProperty(depKey)) {
      newDependencies.push(deps[depKey]);
    }
  }

  outputDependencies(newDependencies);
}

module.exports = compareLocks;
