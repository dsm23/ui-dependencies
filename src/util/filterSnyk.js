function contains(array1, array2) {
  return array1.some((s) => array2.indexOf(s) >= 0);
}

// filter vulnerabilities to only include ones where the 'from' property is listed in dependencies
function filterVulnerabilities(vulnerabilities, dependencies) {
  return vulnerabilities.filter((vulnerability) => {
   if(contains(vulnerability.from, Object.keys(dependencies))) {
     return true
   }
   return false;
 }, {});
}

function filterSnyk(report, dependencies) {
  return Object.assign({}, report, {
    vulnerabilities: filterVulnerabilities(report.vulnerabilities, dependencies)
  });
}

module.exports = filterSnyk;
