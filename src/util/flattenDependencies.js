function flattenDependencies(dependencyMap, dependencies) {
  return Object.keys(dependencies).reduce(
    (dependencyMap, key) => {
      const dependency = dependencies[key];

      if (dependency.resolved) {
        const mapKey = `${key}@${dependency.version}`;

        dependencyMap[mapKey] = dependencyMap[mapKey] || dependency.resolved;

        if (dependency.dependencies) {
          dependencyMap = flattenDependencies(dependencyMap, dependency.dependencies);
        }
      }

      return dependencyMap;
    },
    dependencyMap
  );
}

module.exports = flattenDependencies;
