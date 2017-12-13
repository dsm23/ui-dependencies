const jsonfile = require('jsonfile');
const path = require('path');
const execSync = require('child_process').execSync;

function snykToHtml(packagePath, resultsFileName, report) {
  jsonfile.writeFileSync(path.join(packagePath, `${resultsFileName}.json`), report);
  execSync(
    `cd ${packagePath} && snyk-to-html -i ${resultsFileName}.json -o ${resultsFileName}.html`, {
      stdio: 'inherit'
    }
  );
}

module.exports = snykToHtml;
