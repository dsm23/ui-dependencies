# Dependency Mirror

This repo only exists to mirror the current dependencies used in the real app. We do this because we want to install npm modules and keep a track of all the dependencies, updates to existing modules that happens with `npm i <some module>`.

## Basic usage

Your basic flow should be:

- navigate to this repo in `GIT BASH` (`Powershell` seems to mangle `git` output)
- `git pull` so you have the latest snapshot
- `npm i` to make sure you're up to date, and at parity with the `SEC_ENV` repo
- install the modules you want, as many as you want
- `git commit` and `git push`
- now run the `nodeJS` script with `node getDepsDelta.js`
- you will have a new file appear in the repo (it's ignored), which has the following pattern: `<timestamp minus these angled brackets>.new-dependencies.txt`
- send this list along to the platform team however you see fit
- you will also need to send the tarballs of the `npm` modules. The `slurp.sh` shell script will parse your above `*.new-dependencies.txt` file and download the files. The only arg is your text file: `slurp.sh your.txt`

The important point to note is that you need to keep the repo up to date, so you *need* to commit and push after you've installed your new modules. This means the next person to use this is up to date.

## Advanced usage

The above instructions create a file that extracts a delta of the modules referenced in the `package-lock.json` file between the currently committed version (in `HEAD`), and the version from the previous commit (in `HEAD~1`).  It is however possible to compare versions between any commits by using the `--fromCommit=<commit>` and `--toCommit=<commit>` command line arguments (where `<commit>` needs to be replaced with a git version hash or reference).  Both of these are optional and default to `HEAD~1` and `HEAD` respectively.

For example, run a comparison between the current version and the one from three versions ago, one would run `node getDepsDelta.js --fromCommit=HEAD~3`.  To run a comparison between the versions 4 and 5 commits ago, one would run `node getDepsDelta --fromCommit=HEAD~5 --toCommit=HEAD~4`.

As noted, one can compare using a git commit hash, which can allow for comparison between different branches.  To get the current hash of the branch you're currently on run `git reg-parse HEAD`.

### Notes

- the above could probably be improved. Patches welcome.
- yes, it's brittle. Patches welcome.
- it's making the best of the cards dealt. Patches welcome.
- the `slurp.sh` script could probably be incorporated into the main `node` script behind a flag. Patches welcome.
- the tool is not tested against modules referenced with URLs rather than versions, and may break in such circumstances. Patches welcome.
