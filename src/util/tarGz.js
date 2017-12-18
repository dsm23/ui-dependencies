const tar = require('tar');
const path = require('path');

function tarGz(source) {
  const outputPath = path.format(Object.assign({},
    path.parse(path.join(source)),
    {ext:'.tar.gz', base: undefined})
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
