const fs = require('fs');
const path = require('path');

const requestsPath = './requests';

function getRequestFolder() {
  if (!fs.existsSync(requestsPath)) {
    fs.mkdirSync(requestsPath);
  }

  const now = new Date();
  const requestFolder = `${now.getFullYear()}${now.getMonth().toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  const dir = path.join(requestsPath, requestFolder);
  fs.mkdirSync(dir);
  return dir;
}

module.exports = getRequestFolder;
