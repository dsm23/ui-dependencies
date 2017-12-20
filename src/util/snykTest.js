const execSync = require("child_process").execSync;

/**
 * Run snyk test on a package
 * @param  {String} packagePath path to package
 * @return {Object}             Snyk report
 */
function snykTest(packagePath) {
  // TODO: exec is limited to 200kb, use spawn instead to support larger reports

  let snykReport;
  try {
    snykReport = execSync(`cd ${packagePath} && snyk test --dev --json`);
  } catch (e) {
    snykReport = e.stdout;
  }

  return JSON.parse(snykReport);
}

module.exports = snykTest;
