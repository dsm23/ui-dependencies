const fs = require('fs');

function deleteFile(path) {
  // eslint-disable-next-line consistent-return, no-unused-vars
  fs.stat(path, function(err, stats) {
    if (err) {
      // eslint-disable-next-line no-console
      return console.error(err);
    }

    fs.unlink(path, function(error) {
      if (error) {
        // eslint-disable-next-line no-console
        return console.log(error);
      }
      // eslint-disable-next-line no-console
      return console.log('file deleted successfully');
    });
  });
}

module.exports = deleteFile;
