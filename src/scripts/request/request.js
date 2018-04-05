const program = require("commander");

const loadLockFile = require("../../util/loadLockFile");
const flattenDependencies = require("../../util/flattenDependencies");
const saveRequest = require("../../util/saveRequest");
const getRequested = require("../../util/getRequested");
const loadApproved = require("../../util/loadApproved");

program.version("0.1.0").parse(process.argv);

const requestFolder = "./requests/latest";

const lock = loadLockFile(requestFolder);
const dependencies = flattenDependencies({}, lock);
const approved = loadApproved();
const requested = getRequested(dependencies, approved);

saveRequest(requested, requestFolder);
