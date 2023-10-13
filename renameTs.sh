#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <folder>"
  exit 1
fi

folder="$1"

# Check if the folder exists
if [ ! -d "$folder" ]; then
  echo "Folder '$folder' does not exist."
  exit 1
fi

# Rename all .js files to .ts
find "$folder" -type f -name "*.js" -exec sh -c '
  for jsfile do
    tsfile="${jsfile%.js}.ts"
    mv "$jsfile" "$tsfile"
    echo "Renamed: $jsfile -> $tsfile"
  done
' sh {} +

echo "All .js files in '$folder' have been renamed to .ts"
