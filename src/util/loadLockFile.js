const jsonfile = require("jsonfile");
const path = require("path");

/**
 * Load a pakage lock from a given module path
 * @param  {String} modulePath path to module
 * @return {Object}            package lock contents
 */
function loadLockFile(modulePath) {
  return jsonfile.readFileSync(
    path.join(modulePath, "package-lock.json"),
    "utf8"
  );
}

module.exports = loadLockFile;
