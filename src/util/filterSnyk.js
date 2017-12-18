/**
 * Checks if array1 an element in array2
 * @param  {Array} array1
 * @param  {Array} array2
 * @return {bool}         true if array1 contains an element in array 2
 */
function contains(array1, array2) {
  return array1.some((s) => array2.indexOf(s) >= 0);
}

/**
 * filter vulnerabilities to only include ones where the 'from' property is listed in dependencies
 * @param  {Object} vulnerabilities Snyk vulnerabilities
 * @param  {Object} dependencies    Dependencies that we care about
 * @return {Object}                 Filtered dependencies
 */
function filterVulnerabilities(vulnerabilities, dependencies) {
  return vulnerabilities.filter((vulnerability) => {
   if(contains(vulnerability.from, Object.keys(dependencies))) {
     return true
   }
   return false;
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
