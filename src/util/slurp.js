const download = require("download");

/**
 * Download all packages to the target folder
 * @param  {Object} packages Packages to download
 * @param  {String} target   Target path
 * @return {Promise}          Promise that completes when all packages have been downloaded
 */
function slurp(packages, target) {
  return Promise.all(Object.values(packages).map(x => download(x, target)));
}

module.exports = slurp;
