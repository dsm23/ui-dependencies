const jsonfile = require('jsonfile');
const path = require('path');
const execSync = require('child_process').execSync;

function snykToHtml(packagePath, resultsFileName, report) {
  jsonfile.writeFileSync(path.join(packagePath, resultsFileName), report);
  execSync(
    // eslint-disable-next-line max-len
    `cd ${packagePath} && snyk-to-html -i ${resultsFileName} -o results.html`, {
      stdio: 'inherit'
    }
  );
}

module.exports = snykToHtml;
