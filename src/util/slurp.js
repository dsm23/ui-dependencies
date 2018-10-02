const download = require("download");
const path = require("path");

const getNamespace = require("./getNamespace");
/**
 * Download all packages to the target folder
 * @param  {Object} packages Packages to download (keys include namespace and version, values are target urls)
 * @param  {String} target   Target path
 * @return {Promise}          Promise that completes when all packages have been downloaded
 */
function slurp(packages, target) {
  return Promise.all(
    Object.keys(packages).map(pkg => {
      const namespace = getNamespace(pkg);
      const newTarget = namespace ? path.join(target, `@${namespace}`) : target;
      console.log(`downloading ${pkg} from ${packages[pkg]} to ${newTarget}`);
      download(packages[pkg], newTarget);
    })
  );
}

module.exports = slurp;
