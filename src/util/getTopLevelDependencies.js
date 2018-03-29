// dep = npm ls axios --depth=0 --json
const execSync = require("child_process").execSync;

/**
 * Run npm install on a given package (e.g. so that Snyk can be run)
 * @param  {String} packagePath path to package
 */
function getTopLevelDependencies(path) {
  let cliOutput;

  try {
    cliOutput = execSync(`cd ${path} && npm ls --depth=0 --json`);
  } catch (e) {
    cliOutput = e.stdout;
  }
  const data = JSON.parse(cliOutput);
  return data.dependencies;
}

module.exports = getTopLevelDependencies;
