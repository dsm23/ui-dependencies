# Requirements

A list of requirements for the UI dependencies tool, to aid any further refactoring.

- identify which dependencies in a package-lock.json (including all sub dependencies) are not already in Artifactory.
- generate a list of these missing packages in specific json (for Snyk) and txt (for submission) formats.
- process the generated list and produce a Snyk report.
- when a requested list has been accepted, ensure there is a mechanism to ensure this tool reflects the approved dependencies.
- must support dependency tree having multiple versions of the same package
- generate md5 of import zip and snyk report


# Nice to have

- mark a dependency as being 'requested' but not 'approved' so that any subsequent imports before approval can choose to not include already requested dependencies.
- differentiate between a package matching semver of requirements and a possible update
- download all npm deps tgz files


# Plan

NPM Scripts:

## init <package-lock>

Loads the contents of a package-lock.json file and marks all of its dependencies and sub dependencies as approved. Used for initialisation.

## request <package-lock>

Build a bundle for requesting the dependencies and sub dependencies of a package-lock that are not already marked as approved.

## approve <module-list>

Load the contents of a json file following the structure:

```
{
  "module-name@version": "tarball-url"
}
```

...and mark them all as approved.
