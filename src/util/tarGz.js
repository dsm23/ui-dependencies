const tar = require("tar");
const path = require("path");

/**
 * Tars and gzips a given file/folder
 * @param  {String} source path to file/folder to tgz
 * @return {String}        path to created tgz
 */
function tarGz(source) {
  const outputPath = path.format(
    Object.assign({}, path.parse(path.join(source)), {
      ext: ".tgz",
      base: undefined
    })
  );
  tar.c(
    {
      gzip: true,
      file: outputPath,
      sync: true
    },
    [source]
  );
  return outputPath;
}

module.exports = tarGz;
