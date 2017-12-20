const jsonfile = require("jsonfile");
const path = require("path");
const execSync = require("child_process").execSync;

/**
 * Convert a snyk report JSON to HTML (also outputs JSON file to disk as side effect)
 * @param  {String} packagePath     path to package
 * @param  {String} resultsFileName file name to use (will have .html added to it)
 * @param  {Object} report          Snyk report
 * @return {String}                 Path to html snyk report
 */
function snykToHtml(packagePath, resultsFileName, report) {
  jsonfile.writeFileSync(
    path.join(packagePath, `${resultsFileName}.json`),
    report
  );
  execSync(
    `cd ${packagePath} && snyk-to-html -i ${resultsFileName}.json -o ${resultsFileName}.html`,
    {
      stdio: "inherit"
    }
  );
  return path.join(packagePath, `${resultsFileName}.html`);
}

module.exports = snykToHtml;
