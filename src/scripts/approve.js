// Load the contents of a json file following the structure:
//
//  ```
//  {
//    "module-name@version": "tarball-url"
//  }
//  ```
//
//  ...and mark them all as approved.
const program = require("commander");

const loadRequest = require("../util/loadRequest");
const loadApproved = require("../util/loadApproved");
const saveApproved = require("../util/saveApproved");

program.version("0.1.0").parse(process.argv);

const relPathToRequest = program.args[0];

const approved = loadApproved();
const request = loadRequest(relPathToRequest);
const updatedApproved = Object.assign({}, approved, request);
saveApproved(updatedApproved);

console.log("done");
