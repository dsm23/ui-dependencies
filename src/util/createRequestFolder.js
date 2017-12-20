const fs = require("fs");
const path = require("path");

const requestsPath = "./requests";

/**
 * Creates a new request folder based on the current datetime.
 * @return {String} Path to the created request folder.
 */
function getRequestFolder() {
  if (!fs.existsSync(requestsPath)) {
    fs.mkdirSync(requestsPath);
  }

  const now = new Date();
  const requestFolder = `${now.getFullYear()}${now
    .getMonth()
    .toString()
    .padStart(2, "0")}${now
    .getDate()
    .toString()
    .padStart(2, "0")}${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  const dir = path.join(requestsPath, requestFolder);
  fs.mkdirSync(dir);
  fs.mkdirSync(path.join(dir, "packages"));
  return dir;
}

module.exports = getRequestFolder;
