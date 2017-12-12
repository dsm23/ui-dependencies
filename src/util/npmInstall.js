const execSync = require('child_process').execSync;

function npmInstall(packagePath) {
  execSync(
    // eslint-disable-next-line max-len
    `cd ${packagePath} && npm install`, {
      stdio: 'inherit'
    }
  );
}

module.exports = npmInstall;
