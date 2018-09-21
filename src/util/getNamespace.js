/**
 * @param  {String} packageName  npm package name with optional version, e.g. @govuk-react/button, e.g. @govuk-react/button@1.0.0, e.g. button@1.0.0
 * @return {String}              namespace e.g. govuk-react
 */
function getNamespace(packageName) {
  if (packageName.startsWith("@")) {
    return packageName.substr(1, packageName.indexOf("/") - 1);
  } else {
    return undefined;
  }
}

module.exports = getNamespace;
