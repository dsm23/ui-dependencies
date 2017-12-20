const jsonfile = require("jsonfile");

/**
 * Save approved dependencies to a file
 * @param  {Object} approved Approved dependencies
 */
function saveApproved(approved) {
  const sorted = Object.keys(approved)
    .sort()
    .reduce(
      (acc, key) =>
        Object.assign({}, acc, {
          [key]: approved[key]
        }),
      {}
    );
  jsonfile.writeFileSync("./approved.json", sorted, { spaces: 2 });
}

module.exports = saveApproved;
