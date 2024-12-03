#!/bin/bash

# Exit script on error
set -e

# Step 1: Run the build process
echo "Building the project..."
npm run build

# Step 2: Path to the HTML file to modify (adjust this if needed)
HTML_FILE="dist/index.html" # Update with the correct build output location of your HTML file

# Step 3: Check if the HTML file exists
if [[ ! -f "$HTML_FILE" ]]; then
    echo "Error: HTML file '$HTML_FILE' not found."
    exit 1
fi

# Step 4: Remove leading '/' from 'href' attributes
echo "Modifying HTML file to fix paths..."
sed -i '' -E 's/href="\/([^"]*)"/href="\1"/g' "$HTML_FILE"

# Step 5: Confirm success
echo "Build and modification complete. Updated file: $HTML_FILE"