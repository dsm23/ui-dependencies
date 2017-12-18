// for a given file, output the md5 to a file with the same name in the same directory but with the extension .md5

const md5File = require('md5-file');
const fs = require('fs');
const path = require('path');

/**
 * Output the md5 of a given file under the same path but with .md5 extension
 * @param  {String} filepath path to file to md5
 */
function outputMd5ToFile(filepath) {
  const hash = md5File.sync(filepath);
  const fpath = path.format(Object.assign({},
    path.parse(path.join(filepath)),
    {ext:'.md5', base: undefined})
  );
  fs.writeFileSync(fpath, hash);
}

module.exports = outputMd5ToFile;
