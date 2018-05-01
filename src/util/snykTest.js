const jsonfile = require("jsonfile");
const path = require("path");
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

  const report = JSON.parse(snykReport);
  if (report.error) {
    console.warn("Snyk returned error");
    console.warn(report.error);
    jsonfile.writeFileSync(path.join(packagePath, `snyk-error.json`), report);
    throw new Error(`Snyk returned error: ${report.error}`);
  }
  return report;
}

module.exports = snykTest;
