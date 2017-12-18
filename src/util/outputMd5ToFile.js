// for a given file, output the md5 to a file with the same name in the same directory but with the extension .md5

const md5File = require('md5-file');
const fs = require('fs');
const path = require('path');

function outputMd5ToFile(filepath) {
  const hash = md5File.sync(filepath);
  const fpath = path.format(Object.assign({},
    path.parse(path.join(filepath)),
    {ext:'.md5', base: undefined})
  );
  console.log('writing hash to ' + fpath);
  fs.writeFileSync(fpath, hash);
}

module.exports = outputMd5ToFile;
