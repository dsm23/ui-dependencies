#!/bin/sh

# the text file, argument 1
NPM_MODULE_LIST=$1

# loop through each line
while read npmModulePath
do
  # output the file
  # -O flag tells curl to output as the filename
  curl -O $npmModulePath
done < $NPM_MODULE_LIST
