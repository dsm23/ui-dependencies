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

### Prerequisites

- Clone this repository and run `npm install`.
- Ensure that `snyk` and `snyk-to-html` are installed globally on your machine. `npm i -g snyk snyk-to-html`
- Ensure you have authenticated with snyk by running `snyk auth`
- Ensure you access to create folders on https://ibm.ent.box.com/folder/40373591140 by requesting access from the Platform Team in slack.

### 1. Adding new dependencies

- add new dependencies to the `./merged/package.json`
- run `npm install` inside `./merged`

If you are not ready to raise a request at this point, you can open a pull request for the `merged/package.json` and `merged/package-lock.json` so that these packages are picked up by the next request.

#### Semver updates

We should aim to routinely check for updated packages, both within and outside of our semver. The following instructions are optional but should be done ideally at least once per month.

- Run `npm update` inside `./ui-dependencies/merged` in order to get the latest version of all dependencies respecting semver, this will help ensure we don't get resolved Snyk vulnerabilities in the report.
- `npm update` doesn't update sub dependency versions that are locked by package-lock, or present in node_modules. To prevent Snyk from complaining about issues that can be resolved via a semver update, delete the node_modules folder and package-lock from `./ui-dependencies/merged` and run `npm install` again.
- If you want to update packages ignoring semver, you can use the npm module `npm-check-updates` (from merged folder: `npm i npm-check-updates && ncu -u`)
- Dependencies that have been copied across from another package should also be updated in the original package, or updated before copying across.

### 2. Creating the files required to make a request

Once there have been updates to `merged/package.json` and/or `merged/package-lock.json`, you can create a new request folder by:

**a)** running `npm run request` from the root of the ui-depencencies project

or

**b)** for a minimal request, run `npm run minimal`, or for a minimal request without any modules that introduce vulnerabilities, run `npm run no-vulnerabilities`.

or (especially if you are hitting 413 errors from snyk)

**c)** if you want to only import specific modules, do the following:
  - `npm run request:new`
  - manually edit requests/latest/package.json and remove any modules you don't want to include in your import
  - `npm run request:test`
  - `npm run request:request`
  - `npm run request:download`

### 3. Creating the request

1. Review the `requests/yyyymmddhhmmss/requested.json` file to check it is what you are expecting.
2. Create a Jira ticket in the secure environment with the following details and note the ticket number
  - Project: Systems Team (SYS)
  - Issue Type: Import Request
  - Summary: UI Dependencies yyyymmddhhmmss
  - Import Type: NPM
  - Justification: Dependencies required for UI project
  - MD5 Hash - Artifact: {contents of packages.md5 }
  - MD5 Hash - Scan Report: {contents of snyk-complete.md5}
  - File Current Location: Box - NLEDS Third Party Software Drop
  - Import target environment: SEC-ENV: dev
  - Import File Target Location: Artifactory - third-party-npms
  - Description: Please unpackage packages.tgz before importing using tar/gzip (available in Git Bash in the dev VMs)
  - Description: Also append information as to why the requested dependencies are required in the secure environment
3. Create a directory called `SYS-XXX` (where XXX is the Jira ticket number) in Box at https://ibm.ent.box.com/folder/40373591140.
4. Upload `requests/yyyymmddhhmmss/packages.tgz` to this folder.
5. Raise a PR to add `requests/yyyymmddhhmmss/packages.json` in to master.
6. Send `snyk-complete.html` to the support team via CJSM. If you don't have access to CJSM, you can email an encrypted version of these files to someone that does (e.g. Pete Lockey) using the standard passphrase (again, ask someone e.g. Pete Lockey if you don't know this).

### Draft email:

---

Hi,

Please could you forward this via CJSM to Joe Hardy, James Goodwin and Dominic Simpson.

Thanks


Please find attached the Snyk report for SYS-XXX, which is an import of several new and revised NPM modules for use by the webapp.

This import adds a few vulnerabilities compared to the previous import.  What is important to note however is that there are *no* vulnerabilities applicable to any module included within this import.

What follows is a complete run-down of all the vulnerabilities being reported:


>  contents of known-issues.txt
>  Add "This affects a module that is *not* included in this import, but one that we have already imported." if the vulnerable module is not included in the import


---



### 4. Approval

Once the packages are approved, run `npm run approve requests/yyyymmddhhmmss` and raise a PR to merge the updated `approved.json` and `merged/package.json` to master.
