// takes a flattened lock and removes dependencies that are already approved
function getRequested(dependencies, approved) {
  return dependencies.reduce((acc, request) => {
      if(approved[request] === dependencies[request]) {
        // package is approved and tarball url matches, no need to request
        return acc;
      } else if(approved[request]) {
        // package is approved but tarball url differs, don't request but log warning
        console.warn(`${request} is already approved but tarball url difers:
  current: ${approved[request]}
  new: ${dependencies[request]}`);
        return acc;
      }
      return Object.assign({}, acc, {
        [request]: dependencies[request]
      });
  },  {});
}

module.exports = getRequested;
