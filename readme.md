# Dependency Mirror

This repo only exists to mirror the current dependencies used in the real app. We do this because we want to install npm modules and keep a track of all the dependencies, updates to existing modules that happens with `npm i <some module>`.

For details on running the snyk test please see: https://ibm.ent.box.com/file/241199751146
run `snyk test --dev --json | snyk-to-html -o <current folder>/reports/results<todays date>.html
`

## Basic usage

Your basic flow should be:

- we assume you've checked this out already and `npm i`. The will get you to parity with the `SEC_ENV` repo.
- navigate to this repo in `GIT BASH` (`Powershell` seems to mangle `git` output)
- `git pull` so you have the latest snapshot
- make a note of your current git hash. You can do `git rev-parse HEAD`. Copy paste, write it down somewhere, however you see fit
- install the modules you want, as many as you want
- `git commit` and `git push`
- now run the `nodeJS` script with `node getDepsDelta.js --fromCommit=<that commit hash has you made a note of earlier, minus these angled brackets>`
- you will have a new file appear in the repo (it's ignored), which has the following pattern: `<timestamp minus these angled brackets>.new-dependencies.txt`
- send this list along to the platform team however you see fit
- you will also need to send the tarballs of the `npm` modules. The `slurp.sh` shell script will parse your above `*.new-dependencies.txt` file and download the files. The only arg is your text file: `slurp.sh your.txt`

The important point to note is that you need to keep the repo up to date, so you *need* to commit and push after you've installed your new modules. This means the next person to use this is up to date.

### Notes

- the above could probably be improved. Patches welcome.
- yes, it's brittle. Patches welcome.
- it's making the best of the cards dealt. Patches welcome.
- the `slurp.sh` script could probably be incorporated into the main `node` script behind a flag. Patches welcome.
