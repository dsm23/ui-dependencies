const fs = require('fs');
const path = require('path');

function outputDependencies(dependencies, directory) {
  fs.writeFileSync(path.join(directory, 'requested.txt'),
    dependencies.reduce((acc, dep) => {
      return acc + dep + '\n';
    }, '')
  );
}

module.exports = outputDependencies;
