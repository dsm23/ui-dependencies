const path = require("path");

const tarGz = require("../../util/tarGz");
const outputMd5ToFile = require("../../util/outputMd5ToFile");

const requestFolder = "./requests/latest";

const tarballs = path.join(requestFolder, "packages");

console.log(`Creating tarball for: ${tarballs}...`);
const tarballsgz = tarGz(tarballs);
outputMd5ToFile(tarballsgz);
console.log("...done");
