# Requirements

A list of requirements for the UI dependencies tool, to aid any further refactoring.

- identify which dependencies in a package-lock.json (including all sub dependencies) are not already in Artifactory.
- generate a list of these missing packages in specific json (for Snyk) and txt (for submission) formats.
- process the generated list and produce a Snyk report.
- when a requested list has been accepted, ensure there is a mechanism to ensure this tool reflects the approved dependencies.
- must support dependency tree having multiple versions of the same package


# Nice to have

- mark a dependency as being 'requested' but not 'approved' so that any subsequent imports before approval can choose to not include already requested dependencies.
- differentiate between a package matching semver of requirements and a possible update
- download all npm deps tgz files


# Plan

Follow npm format e.g. https://registry.npmjs.org/ansi-styles
