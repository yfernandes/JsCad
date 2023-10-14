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

# Part 1: Rename all .js files to .ts
find "$folder" -type f -name "*.js" -exec sh -c '
  for jsfile do
    tsfile="${jsfile%.js}.ts"
    mv "$jsfile" "$tsfile"
    echo "Renamed: $jsfile -> $tsfile"
  done
' sh {} +

# Part 2: Append contents of .d.ts to .ts
find "$folder" -type f -name "*.d.ts" -exec sh -c '
  for dtsfile do
    tsfile="${dtsfile%.d.ts}.ts"
    
    # Check if the .ts file exists and append the contents of .d.ts to it
    if [ -f "$tsfile" ]; then
      cat "$dtsfile" >> "$tsfile"
      echo "Appended contents of $dtsfile to $tsfile"
      
      # Remove the .d.ts file
      rm "$dtsfile"
      echo "Deleted: $dtsfile"
    fi
  done
' sh {} +

# Part 3: Delete remaining .d.ts files
find "$folder" -type f -name "*.d.ts" -exec sh -c '
  for dtsfile do
    rm "$dtsfile"
    echo "Deleted: $dtsfile"
  done
' sh {} +

echo "Part 1: Renamed all .js files in '$folder' to .ts"
echo "Part 2: Appended .d.ts contents to .ts in '$folder'"
echo "Part 3: Deleted remaining .d.ts files in '$folder'"
