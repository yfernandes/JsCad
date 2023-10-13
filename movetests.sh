#!/bin/bash

# Set the source directory
source_dir="./packages"

# Find .test.js files and move them to a 'test' folder in the same directory
find "$source_dir" -type f -name "*.test.js" -not -path "*/node_modules/*" | while read file; do
  dir="$(dirname "$file")"
  new_dir="$dir/test"
  mkdir -p "$new_dir"
  mv "$file" "$new_dir"
done

echo "Moved .test.js files to 'test' folders within their respective directories."
