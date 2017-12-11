const flattenDependencies = require('./flattenDependencies');

function compareLocks(prevLockFile, lockFile) {
  const deps = flattenDependencies({}, lockFile.dependencies);
  const prevDeps = flattenDependencies({}, prevLockFile.dependencies);
  const newDependencies = [];

  for (let depKey in deps) {
    if (!prevDeps.hasOwnProperty(depKey)) {
      newDependencies.push(deps[depKey]);
    }
  }

  return newDependencies;
}

module.exports = compareLocks;
