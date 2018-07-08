#!/usr/bin/env bash

HOST=$1
SRC="src"
BUILD="build"

if [ -z $HOST ]; then
  echo "HOST NOT FOUND"
  exit 1
fi

## Start fresh everytime
if [ ! -d "./$BUILD" ];then
  echo "build directory not found, making one now..."
  mkdir "./$BUILD"
else
  echo "purging old build"
  rm -rf "./$BUILD/*"
fi

## These files need to be searched and replaced
declare -a FILES=("popup.js" "background.js" "manifest.json")

for i in "${FILES[@]}"
do
  echo "substituting $i..."
  sed -e "s/YOUR_HOST/$HOST/g" "$SRC/$i" > "$BUILD/$i"
done

## These files just need to be copied
declare -a COPIES=("popup.html")
for i in "${COPIES[@]}"
do
  echo "copying $i..."
  cp "$SRC/$i" "$BUILD/$i"
done

echo "done"
