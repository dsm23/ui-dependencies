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

## Workflow for getting npm modules in to the secure environment

### 1. Adding new dependencies
The first step is to add any new dependencies to the `./merged/package.json` (and associated lock) of tge ui-dependencies project:

- run `copy-dependencies ./webapp ./ui-dependencies/merged`
- run `npm install` inside `./ui-dependencies/merged`

If you are not ready to raise a request at this point, you can open a pull request for the `merged/package.json` and `merged/package-lock.json` so that these packages are picked up by the next request.

#### Semver updates

- Optionally run `npm update` inside `./ui-dependencies/merged` in order to get the latest version of all dependencies respecting semver.
- If you want to update packages ignoring semver, you can use the npm module `npm-check-updates`
- Dependencies that have been copied across from another package should also be updated in the original package, or updated before copying across.

### 2. Creating a request

Once there have been updates to `merged/package.json` and/or `merged/package-lock.json`, you can create a new request folder by:

- ensuring `npm install && npm prune` has been done in the `merged` folder if not already done in previous step
- run `npm run request` from the root of the ui-depencencies project

After running this, follow these steps:

1. Review the `requests/yyyymmddhhmmss/requested.json` file to check it is what you are expecting.
2. Create a Jira ticket in the secure environment with the following details and note the ticket number
  - Project: Platform
  - Issue Type: Import Request
  - Import Type: NPM
  - MD5 Hash - Artifact: {contents of packages.md5 }
  - MD5 Hash - Scan Report: {contents of snyk-complete.md5}
  - Import File Target Location: Artifactory
3. Create a directory called `PFM-XXX` (where XXX is the Jira ticket number) in Box at https://ibm.ent.box.com/folder/40373591140, access to this can be granted by Daniel Stevenson or a member of the platform team.
4. Upload `requests/yyyymmddhhmmss/packages.tgz` to this folder.
5. Raise a PR to add `requests/yyyymmddhhmmss/packages.json` in to master.
6. Send `snyk-filtered.html` to the support team via CJSM. If you don't have access to CJSM, you can email an encrypted version of these files to someone that does (e.g. Pete Lockey) using the standard passphrase (again, ask someone e.g. Pete Lockey if you don't know this).

### 3. Approval

Once the packages are approved, run `npm run approve requests/yyyymmddhhmmss` and raise a PR to merge the updated `approved.json` to master.
