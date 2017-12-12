const execSync = require('child_process').execSync;

function snykTest(packagePath, resultsFileName) {
  // TODO: exec is limited to 200kb, use spawn instead to support larger reports
  const snykReport = execSync(
    // eslint-disable-next-line max-len
    `cd ${packagePath} && snyk test --dev --json`, {
      stdio: 'inherit'
    }
  );
  console.log(JSON.parse(snykReport));
  return JSON.parse(snykReport);
}

module.exports = snykTest;
