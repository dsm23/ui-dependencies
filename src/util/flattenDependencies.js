/**
 * Flatten a package lock to specific dependencies
 * @param  {Object} dependencyMap Accumulating dependencies map (start with {})
 * @param  {Object} packageLock   A package-lock.json file or a dependency subnode to parse
 * @return {Object}               Updated dependencyMap with flattened contents of packageLock
 */
function flattenDependencies(dependencyMap = {}, packageLock) {
  const dependencies = packageLock.dependencies;
  return Object.keys(dependencies).reduce(
    (dependencyMap, key) => {
      const dependency = dependencies[key];

      if (dependency.resolved) {
        const mapKey = `${key}@${dependency.version}`;

        dependencyMap[mapKey] = dependencyMap[mapKey] || dependency.resolved;

        if (dependency.dependencies) {
          dependencyMap = flattenDependencies(dependencyMap, dependency);
        }
      }

      return dependencyMap;
    },
    dependencyMap
  );
}

module.exports = flattenDependencies;
