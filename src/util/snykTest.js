const execSync = require('child_process').execSync;

function snykTest(packagePath) {
  // TODO: exec is limited to 200kb, use spawn instead to support larger reports

  let snykReport
  try {
    snykReport = execSync(
      // eslint-disable-next-line max-len
      `cd ${packagePath} && snyk test --dev --json`
    );
  } catch(e) {
    snykReport = e.stdout;
  }
  console.log(snykReport);
  // console.log(JSON.parse(snykReport));

  return JSON.parse(snykReport);
}

module.exports = snykTest;
