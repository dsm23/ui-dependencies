// - generate a snyk report
// - remove any warnings from snyk report

const snykTest = require("../../util/snykTest");
const filterSnyk = require("../../util/filterSnyk");
const snykToHtml = require("../../util/snykToHtml");
const outputMd5ToFile = require("../../util/outputMd5ToFile");

/* eslint-disable-next-line import/no-unresolved node/no-missing-require */
const requested = require("../../../requests/latest/requested.json");

const requestFolder = "./requests/latest";
const npmInstall = require("../../util/npmInstall");

npmInstall(requestFolder);

const snykReport = snykTest(requestFolder);
const resultsComplete = snykToHtml(requestFolder, "snyk-complete", snykReport);
const filteredSnyk = filterSnyk(snykReport, requested);
const resultsFiltered = snykToHtml(
  requestFolder,
  "snyk-filtered",
  filteredSnyk
);

outputMd5ToFile(resultsComplete);
outputMd5ToFile(resultsFiltered);
