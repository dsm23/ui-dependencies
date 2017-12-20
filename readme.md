# UI Dependencies

A series of scripts and utilities to enable the following:

- identify which dependencies in a package-lock.json (including all sub dependencies) are not already in Artifactory.
- generate a list of these missing packages in specific json (for Snyk) and txt (for submission) formats.
- process the generated list and produce a Snyk report.
- when a requested list has been accepted, ensure there is a mechanism to ensure this tool reflects the approved dependencies.
- must support dependency tree having multiple versions of the same package.
- generate md5 of import zip and snyk report.
- download all npm deps tgz files
- provide a mechanism previous requests to be tracked, and future compatibility to e.g. flagging a dependency has been requested previously

Use the following NPM Scripts:

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

## Workflow

- A developer wants to add new packages so runs `copy-dependencies ./webapp ./ui-dependencies/merged` to update the local package json reference.
- To ensure the package-lock is also updated, they run `npm install` inside `./ui-dependencies/merged`
- Optionally a developer can check if there are new versions of dependencies they may also want to include. (TODO: use depcheck)
- A developer creates a request folder by running `npm run request`.
- If the request looks ok, the developer:
  - emails the requested tarballs/reports/lists and/or creates a JIRA ticket (TODO: @Steve please can you detail this step)
  - commits the generated `requests/yyyymmddhhmmss/requested.txt` and `requests/yyyymmddhhmmss/requested.json` to git
- Once the packages are approved, the developer runs `npm run approve requests/yyyymmddhhmmss` and commits the updated `approved.json` to git.
