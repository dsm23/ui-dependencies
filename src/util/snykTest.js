const execSync = require('child_process').execSync;

function snykTest(packagePath, resultsFileName) {
  execSync(
    // eslint-disable-next-line max-len
    `cd ${packagePath} && (snyk test --dev --json > ${resultsFileName}) || echo done`, {
      stdio: 'inherit'
    }
  );
}

module.exports = snykTest;
