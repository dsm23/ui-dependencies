const execSync = require("child_process").execSync;

/**
 * Run npm install on a given package (e.g. so that Snyk can be run)
 * @param  {String} packagePath path to package
 */
function linkLatest(requestId) {
  execSync(`cd requests && ln -shf ${requestId} latest`, {
    stdio: "inherit"
  });
}

module.exports = linkLatest;
