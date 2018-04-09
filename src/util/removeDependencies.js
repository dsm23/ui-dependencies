// remove depenedencies given in toRemove array, which could be in the format "name", "name@version", "@namespace/name", "@namespace/name@version"
// from dependencies object
const removeDependencies = (dependencies, toRemove) =>
  toRemove.reduce(
    (acc, dependency) => {
      let d = dependency;
      const versionIndex = d.lastIndexOf("@");
      if (versionIndex) {
        d = d.substr(0, versionIndex);
      }
      delete acc[d];
      return acc;
    },
    { ...dependencies }
  );

module.exports = removeDependencies;
