/**
 * filter vulnerabilities to only include ones where the 'from' property is listed in requestedDependencies
 * @param  {Object} vulnerabilities           Snyk vulnerabilities
 * @param  {Object} requestedDependencies     Dependencies that are requesting to be added
 * @return {Object}                           Filtered dependencies
 */
function filterVulnerabilities(vulnerabilities, requestedDependencies) {
  return vulnerabilities.filter(vulnerability => {
    const from = vulnerability.from[vulnerability.from.length - 1];
    return Object.keys(requestedDependencies).some(d => d === from);
  }, {});
}

/**
 * filter snyk report to only include vulnerabilities from specific dependencies
 * @param  {Object} report          Snyk report
 * @param  {Object} dependencies    Dependencies that we care about
 * @return {Object}                 Filtered report
 */
function filterSnyk(report, dependencies) {
  return Object.assign({}, report, {
    vulnerabilities: filterVulnerabilities(report.vulnerabilities, dependencies)
  });
}

module.exports = filterSnyk;
