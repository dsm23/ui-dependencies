const download = require('download');

function slurp(packages, target) {
  return Promise.all(Object.values(packages).map(x => download(x, target)));
}

module.exports = slurp;
