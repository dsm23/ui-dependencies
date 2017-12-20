const fs = require("fs");
const path = require("path");

/**
 * Output dependencies to a text file
 * @param  {Array} dependencies  an array of urls to dependency tgz files
 * @param  {String} directory    path to save the txt file
 */
function outputDependencies(dependencies, directory) {
  fs.writeFileSync(
    path.join(directory, "requested.txt"),
    dependencies.reduce((acc, dep) => acc + dep + "\n", "")
  );
}

module.exports = outputDependencies;
