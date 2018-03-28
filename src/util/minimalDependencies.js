const getTopLevelDependencies = require("./getTopLevelDependencies");

// filter dependencies and remove any that have a currently installed version that resolves to an approved version
function minimalDependencies(path, dependencies, approved) {
  const tld = getTopLevelDependencies(path);
  return Object.keys(dependencies).reduce((acc, name) => {
    const version = tld[name].version;
    const approvedKey = `${name}@${version}`;
    const include = !approved[approvedKey];
    if (!include) {
      return acc;
    }
    return {
      ...acc,
      [name]: dependencies[name]
    };
  }, {});
}

module.exports = minimalDependencies;
