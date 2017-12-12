const execSync = require('child_process').execSync;

function snykToHtml(packagePath, resultsFileName) {
  execSync(
    // eslint-disable-next-line max-len
    `cd ${packagePath} && snyk-to-html -i ${resultsFileName} -o results.html`, {
      stdio: 'inherit'
    }
  );
}

module.exports = snykToHtml;
