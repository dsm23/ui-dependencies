const execSync = require("child_process").execSync;

/**
 * Run npm install on a given package (e.g. so that Snyk can be run)
 * @param  {String} packagePath path to package
 */
function npmInstall(packagePath) {
  execSync(`cd ${packagePath} && npm install`, {
    stdio: "inherit"
  });
}

module.exports = npmInstall;
