#!/bin/sh

FILE=$1

echo "$FILE"
while read Name
do
  curl -O $Name
done < $FILE
