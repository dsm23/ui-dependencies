// - generate a snyk report
// - remove any warnings from snyk report

const snykTest = require("../../util/snykTest");
const snykToHtml = require("../../util/snykToHtml");
const outputMd5ToFile = require("../../util/outputMd5ToFile");

const requestFolder = "./requests/latest";
const npmInstall = require("../../util/npmInstall");

npmInstall(requestFolder);

const snykReport = snykTest(requestFolder);
const resultsComplete = snykToHtml(requestFolder, "snyk-complete", snykReport);

outputMd5ToFile(resultsComplete);
