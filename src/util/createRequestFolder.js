const fs = require("fs");
const path = require("path");

/**
 * Creates a new request folder based on the current datetime.
 * @return {String} Path to the created request folder.
 */
function createRequestFolder(requestsPath = "./requests") {
  if (!fs.existsSync(requestsPath)) {
    fs.mkdirSync(requestsPath);
  }

  const now = new Date();
  const requestFolder = `${now.getFullYear()}${(now.getMonth() + 1)
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
  return {
    requestId: requestFolder,
    requestPath: dir
  };
}

module.exports = createRequestFolder;
