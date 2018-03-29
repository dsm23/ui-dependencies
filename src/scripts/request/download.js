const path = require("path");

const slurp = require("../../util/slurp");
const tarGz = require("../../util/tarGz");
const outputMd5ToFile = require("../../util/outputMd5ToFile");

const requested = require("../../../requests/latest/requested.json");

const requestFolder = "./requests/latest";

const tarballs = path.join(requestFolder, "packages");

console.log(`Saving tarballs to: ${tarballs}...`);
slurp(requested, tarballs).then(() => {
  const tarballsgz = tarGz(tarballs);
  outputMd5ToFile(tarballsgz);
  console.log("...done");
});
