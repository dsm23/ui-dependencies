const jsonfile = require("jsonfile");
const path = require("path");

/**
 * Creates package.json and package-lock.json files in a request folder so that it can be processed by Snyk
 * @param  {Object} lock          Contents of lock file
 * @param  {Object} package       Contents of package file
 * @param  {String} requestFolder Path to request folder
 */
function createPackageForTest(lock, pkg, requestFolder) {
  if (lock) {
    jsonfile.writeFileSync(
      path.join(requestFolder, "./package-lock.json"),
      lock,
      { spaces: 2 }
    );
  }
  jsonfile.writeFileSync(path.join(requestFolder, "./package.json"), pkg, {
    spaces: 2
  });
}

module.exports = createPackageForTest;
