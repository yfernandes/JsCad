#!/bin/bash

# Set the root directory where you want to delete empty .js files
root_dir="./packages"

# Find and delete empty .js files
find "$root_dir" -type f -name "*.js" -size 0 -delete

echo "Empty .js files deleted."