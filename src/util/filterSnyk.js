function contains(array1, array2) {
  array1.some((s) => array2.indexOf(s) >= 0);
}

// filter vulnerabilities to only include ones where the 'from' property is listed in dependencies
function filterVulnerabilities(vulnerabilities, dependencies) {
  return Object.keys(vulnerabilities).reduce((acc, key) => {
   const vulnerability = vulnerabilities[key];
   if(contains(vulnerability.from, Object.keys(dependencies))) {
     return Object.assign({}, acc, {
       [key]: vulnerability
     });
   }
   return acc;
 }, {});
}

function filterSnyk(report, dependencies) {
  return Object.assign({}, report, {
    vulnerabilities: filterVulnerabilities(report.vulnerabilities, dependencies)
  });
}

module.exports = filterSnyk;
